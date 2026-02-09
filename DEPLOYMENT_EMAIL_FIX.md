# Deployment & Email Issues - Complete Fix Guide

## Issues Found:

### 1. **Email Not Sending in Production**
The SMTP configuration is correct in code, but environment variables are missing in Vercel.

### 2. **Deployment Errors**
Some routes are trying to statically generate when they shouldn't.

---

## Fix #1: Configure Environment Variables in Vercel

### Go to Vercel Dashboard:
https://vercel.com/your-project/settings/environment-variables

### Add These Required Variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://papermark-gdhw.vercel.app

# Force Email Sending in Production
SEND_EMAILS=true

# Database
POSTGRES_PRISMA_URL=your_postgres_connection_string
POSTGRES_PRISMA_URL_NON_POOLING=your_postgres_connection_string

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token

# SMTP Configuration (CRITICAL FOR EMAILS)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyButFGxXP1oBIhTMvOf-WncJCLLaCSjGoM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=papermark-ae888.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=papermark-ae888
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=papermark-ae888.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=195422289777
NEXT_PUBLIC_FIREBASE_APP_ID=1:195422289777:web:d7de8da799c380107080d0
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-WT9KWD4L1Z

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Other Required Variables
NEXT_PUBLIC_BASE_URL=https://papermark-gdhw.vercel.app
NEXT_PUBLIC_MARKETING_URL=https://papermark-gdhw.vercel.app
NEXT_PRIVATE_DOCUMENT_PASSWORD_KEY=your-document-secret-key
NEXT_PRIVATE_VERIFICATION_SECRET=your-verification-secret-key
NEXT_PUBLIC_UPLOAD_TRANSPORT=vercel
```

---

## Fix #2: Update OAuth Redirect URIs

### Google OAuth:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth client
3. Add authorized redirect URI:
   ```
   https://papermark-gdhw.vercel.app/api/auth/callback/google
   ```

### GitHub OAuth:
1. Go to: https://github.com/settings/developers
2. Edit your OAuth App
3. Update callback URL:
   ```
   https://papermark-gdhw.vercel.app/api/auth/callback/github
   ```

---

## Fix #3: Update Firebase Authorized Domains

1. Go to: https://console.firebase.google.com/project/papermark-ae888/authentication/settings
2. Click "Authorized domains"
3. Add: `papermark-gdhw.vercel.app`

---

## Fix #4: Test Email Sending

After adding environment variables, test email:

1. Go to: https://papermark-gdhw.vercel.app/login
2. Enter your email
3. Click "Continue with Email"
4. Check your inbox (and spam folder)

### If Email Still Not Working:

**Check Vercel Logs:**
1. Go to: https://vercel.com/your-project/deployments
2. Click on latest deployment
3. Click "Functions" tab
4. Look for email-related logs

**Common Issues:**
- Gmail App Password expired
- SMTP credentials not set in Vercel
- `SEND_EMAILS=true` not set
- Wrong SMTP_HOST or SMTP_PORT

---

## Fix #5: Deployment Errors

If you see build errors, check:

### Error: "Edge Function size limit"
✅ Already fixed - removed edge runtime from OG routes

### Error: "Invalid has configuration"
✅ Already fixed - conditional header configuration

### Error: "useSession must be wrapped"
✅ Already fixed - added SessionProvider

---

## Quick Checklist:

- [ ] All environment variables added to Vercel
- [ ] `SEND_EMAILS=true` is set
- [ ] SMTP credentials are correct
- [ ] OAuth redirect URIs updated
- [ ] Firebase authorized domains updated
- [ ] Redeploy after adding env vars
- [ ] Test email login
- [ ] Check Vercel function logs

---

## How to Redeploy:

### Option 1: Automatic (Recommended)
```bash
git add .
git commit -m "Update configuration"
git push origin main
```
Vercel will automatically redeploy.

### Option 2: Manual
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Click "..." on latest deployment
4. Click "Redeploy"

---

## Debugging Email Issues:

### Check Logs in Vercel:
1. Go to deployment
2. Click "Functions" tab
3. Look for these log messages:
   - `🔧 [createSMTPTransporter]` - SMTP configuration
   - `📧 [sendEmail]` - Email sending process
   - `✅ [sendEmail] SMTP email sent successfully!` - Success
   - `❌ [sendEmail] SMTP error:` - Error details

### Test SMTP Locally:
```bash
npm run dev
# Try email login at http://localhost:3000/login
# Check terminal for detailed logs
```

---

## Expected Behavior:

### When Email Login Works:
1. User enters email
2. Clicks "Continue with Email"
3. Sees "Email sent - check your inbox!"
4. Receives email with login link
5. Clicks link
6. Gets logged in

### Logs You Should See:
```
🔧 [createSMTPTransporter] Creating SMTP transporter...
📧 [sendEmail] Using SMTP transporter
📧 [sendEmail] Sending via SMTP...
✅ [sendEmail] SMTP email sent successfully!
```

---

## Still Having Issues?

1. **Check Vercel Environment Variables** - Make sure all are set
2. **Check Gmail App Password** - Generate new one if needed
3. **Check Vercel Function Logs** - Look for error messages
4. **Test Locally First** - Make sure it works on localhost
5. **Check Spam Folder** - Email might be there

---

## Contact Support:

If issues persist:
1. Check Vercel function logs
2. Share error messages
3. Verify all environment variables are set
4. Test SMTP credentials with a simple script

---

**Last Updated:** After deployment fixes
**Status:** Ready to deploy with proper configuration
