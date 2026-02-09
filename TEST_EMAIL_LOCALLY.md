# Testing Email Functionality Locally

## ✅ Server Status
- **Status:** Running on http://localhost:3000
- **SMTP Configured:** Yes (Gmail)
- **SEND_EMAILS:** true

## 🧪 Test Steps

### 1. Test Email Login Flow

1. **Open Browser:** http://localhost:3000/login
2. **Enter Email:** vprisha272@gmail.com (or any email)
3. **Click:** "Continue with Email"
4. **Expected Result:** 
   - Success message: "Email sent - check your inbox!"
   - Check terminal logs for SMTP confirmation
   - Check email inbox for verification link

### 2. Check Terminal Logs

Look for these log messages in the terminal:

```
✅ SUCCESS LOGS:
🔑 [NextAuth] sendVerificationRequest called
🔑 [NextAuth] Should send email: true
📧 [sendEmail] Using SMTP transporter
✅ [sendEmail] SMTP email sent successfully!

❌ ERROR LOGS (if any):
❌ [sendEmail] SMTP error: [error details]
```

### 3. Test OAuth Login

#### Google OAuth:
1. Go to: http://localhost:3000/login
2. Click "Continue with Google"
3. Should redirect to Google login
4. After login, should redirect back to app

#### GitHub OAuth:
1. Go to: http://localhost:3000/login
2. Click "Continue with GitHub"
3. Should redirect to GitHub login
4. After login, should redirect back to app

### 4. Test Document Upload (After Login)

1. Login successfully
2. Go to: http://localhost:3000/documents
3. Try uploading a document
4. Check if Vercel Blob storage is working

## 🔍 Common Issues & Solutions

### Issue 1: Email Not Sending
**Symptoms:** No email received, error in logs
**Check:**
- SMTP credentials in `.env` are correct
- Gmail App Password is valid
- `SEND_EMAILS=true` is set
- Check spam folder

**Solution:**
```bash
# Verify Gmail App Password
# Go to: https://myaccount.google.com/apppasswords
# Generate new password if needed
# Update SMTP_PASS in .env
```

### Issue 2: OAuth Not Working
**Symptoms:** OAuth redirect fails
**Check:**
- Redirect URIs in Google/GitHub console
- Should be: http://localhost:3000/api/auth/callback/google
- Should be: http://localhost:3000/api/auth/callback/github

### Issue 3: Database Connection Error
**Symptoms:** Can't login, database errors
**Check:**
- PostgreSQL is running
- Database credentials in `.env` are correct
- Database `papermark` exists

**Solution:**
```bash
# Check if PostgreSQL is running
# Windows: Check Services for PostgreSQL

# Test connection
psql -U postgres -d papermark
```

### Issue 4: File Upload Not Working
**Symptoms:** Upload fails, blob storage error
**Check:**
- `BLOB_READ_WRITE_TOKEN` is set in `.env`
- Token is valid in Vercel dashboard

## 📋 Testing Checklist

- [ ] Server starts without errors
- [ ] Login page loads (http://localhost:3000/login)
- [ ] Email login sends verification email
- [ ] Email verification link works
- [ ] Google OAuth login works
- [ ] GitHub OAuth login works
- [ ] Can access documents page after login
- [ ] Can upload documents
- [ ] No console errors in browser
- [ ] No errors in terminal logs

## 🎯 Next Steps After Local Testing

Once everything works locally:

1. **Fix Production Issues:**
   - Add environment variables to Vercel
   - Update OAuth redirect URIs for production
   - Set up cloud database
   - Test on production URL

2. **Verify Production:**
   - CSS loads correctly ✅ (already fixed)
   - Email sending works
   - OAuth works
   - Database connection works
   - File uploads work

## 📝 Test Results

### Email Test:
- [ ] Email sent successfully
- [ ] Received email in inbox
- [ ] Verification link works
- [ ] Logged in successfully

### OAuth Test:
- [ ] Google OAuth works
- [ ] GitHub OAuth works

### Upload Test:
- [ ] Document upload works
- [ ] File stored in Vercel Blob

### Overall:
- [ ] All features working locally
- [ ] Ready to fix production issues

---

**Current Status:** Server running on http://localhost:3000
**Next:** Test email login and check terminal logs
