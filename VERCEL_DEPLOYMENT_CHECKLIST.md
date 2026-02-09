# Vercel Deployment - Email Fix Checklist

## 🔍 ISSUE ANALYSIS

Your application is deployed successfully at: https://papermark-gdhw.vercel.app/login

**The Problem:** Users are not receiving verification emails when they try to log in.

**Root Cause:** Environment variables (especially SMTP configuration) are missing in Vercel production environment.

---

## ✅ STEP-BY-STEP FIX

### Step 1: Add Environment Variables to Vercel

Go to your Vercel project settings:
**https://vercel.com/[your-username]/papermark-gdhw/settings/environment-variables**

Add ALL these variables (copy from your `.env` file):

```env
# ===== CRITICAL FOR EMAIL SENDING =====
SEND_EMAILS=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# ===== NEXTAUTH CONFIGURATION =====
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=https://papermark-gdhw.vercel.app

# ===== BASE URLS =====
NEXT_PUBLIC_BASE_URL=https://papermark-gdhw.vercel.app
NEXT_PUBLIC_MARKETING_URL=https://papermark-gdhw.vercel.app

# ===== DATABASE =====
POSTGRES_PRISMA_URL=your-postgres-connection-string
POSTGRES_PRISMA_URL_NON_POOLING=your-postgres-connection-string

# ===== VERCEL BLOB STORAGE =====
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# ===== GOOGLE OAUTH =====
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ===== GITHUB OAUTH =====
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# ===== FIREBASE =====
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# ===== STORAGE & SECURITY =====
NEXT_PUBLIC_UPLOAD_TRANSPORT=vercel
NEXT_PRIVATE_DOCUMENT_PASSWORD_KEY=your-document-secret-key
NEXT_PRIVATE_VERIFICATION_SECRET=your-verification-secret-key
NEXT_PRIVATE_UPLOAD_REGION=us-east-1
```

**NOTE:** Copy actual values from your local `.env` file when adding to Vercel.

**IMPORTANT:** 
- Make sure to select "Production", "Preview", and "Development" for each variable
- Click "Save" after adding all variables

---

### Step 2: Update OAuth Redirect URIs

#### Google OAuth Console:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID (from your `.env` file)
3. Click "Edit"
4. Under "Authorized redirect URIs", add:
   ```
   https://papermark-gdhw.vercel.app/api/auth/callback/google
   ```
5. Keep the localhost one: `http://localhost:3000/api/auth/callback/google`
6. Click "Save"

#### GitHub OAuth Settings:
1. Go to: https://github.com/settings/developers
2. Find your OAuth App (from your `.env` file)
3. Click on it
4. Update "Authorization callback URL" to:
   ```
   https://papermark-gdhw.vercel.app/api/auth/callback/github
   ```
5. Click "Update application"

---

### Step 3: Update Firebase Authorized Domains

1. Go to: https://console.firebase.google.com/project/papermark-ae888/authentication/settings
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Add: `papermark-gdhw.vercel.app`
5. Click "Add"

---

### Step 4: Update Database Connection (IMPORTANT!)

Your current database URL points to `localhost:5432` which won't work in production.

**You need to:**

1. **Option A: Use a Cloud Database (Recommended)**
   - Sign up for a free PostgreSQL database:
     - **Neon** (https://neon.tech) - Free tier available
     - **Supabase** (https://supabase.com) - Free tier available
     - **Railway** (https://railway.app) - Free tier available
   
   - Get the connection string (looks like):
     ```
     postgresql://user:password@host.region.provider.com:5432/database
     ```
   
   - Update these variables in Vercel:
     ```env
     POSTGRES_PRISMA_URL=your_cloud_database_connection_string
     POSTGRES_PRISMA_URL_NON_POOLING=your_cloud_database_connection_string
     ```

2. **Option B: Expose Local Database (Not Recommended for Production)**
   - Use ngrok or similar to expose your local database
   - This is only for testing, not for production use

---

### Step 5: Redeploy

After adding all environment variables:

1. Go to: https://vercel.com/[your-username]/papermark-gdhw/deployments
2. Click on the latest deployment
3. Click the "..." menu (three dots)
4. Click "Redeploy"
5. Wait for deployment to complete

**OR** push a new commit:
```bash
cd papermark-main
git add .
git commit -m "Update environment configuration"
git push origin main
```

---

### Step 6: Test Email Login

1. Go to: https://papermark-gdhw.vercel.app/login
2. Enter your email
3. Click "Continue with Email"
4. Check your inbox (and spam folder)
5. Click the verification link

---

## 🐛 DEBUGGING

### Check Vercel Function Logs:

1. Go to: https://vercel.com/[your-username]/papermark-gdhw/deployments
2. Click on latest deployment
3. Click "Functions" tab
4. Look for logs containing:
   - `🔑 [NextAuth] sendVerificationRequest called`
   - `📧 [sendEmail] Using SMTP transporter`
   - `✅ [sendEmail] SMTP email sent successfully!`

### Common Issues:

| Issue | Solution |
|-------|----------|
| "Neither SMTP nor Resend is configured" | Add SMTP variables to Vercel |
| "SMTP error: Invalid login" | Check SMTP_USER and SMTP_PASS |
| "Connection timeout" | Check SMTP_HOST and SMTP_PORT |
| "Database connection failed" | Update database URL to cloud database |
| "OAuth error" | Update redirect URIs in Google/GitHub |

---

## 📋 QUICK VERIFICATION CHECKLIST

Before testing, verify:

- [ ] All environment variables added to Vercel
- [ ] `SEND_EMAILS=true` is set
- [ ] SMTP credentials are correct (especially SMTP_PASS)
- [ ] Database URL points to accessible database (not localhost)
- [ ] Google OAuth redirect URI includes production URL
- [ ] GitHub OAuth callback URL updated
- [ ] Firebase authorized domains includes production domain
- [ ] Redeployed after adding variables
- [ ] Checked Vercel function logs for errors

---

## 🎯 EXPECTED BEHAVIOR

### When Everything Works:

1. User enters email on login page
2. Clicks "Continue with Email"
3. Sees success message: "Email sent - check your inbox!"
4. Receives email within 1-2 minutes
5. Clicks link in email
6. Gets redirected and logged in

### Logs You Should See in Vercel:

```
🔑 [NextAuth] sendVerificationRequest called
🔑 [NextAuth] Identifier: user@example.com
🔑 [NextAuth] Should send email: true
📧 [NextAuth] Calling sendVerificationRequestEmail...
📧 [sendEmail] Starting email send process...
📧 [sendEmail] Using SMTP transporter
📧 [sendEmail] Sending via SMTP...
✅ [sendEmail] SMTP email sent successfully!
```

---

## ⚠️ CRITICAL NOTES

1. **Database Issue:** Your current database URL (`localhost:5432`) will NOT work in production. You MUST use a cloud database.

2. **Gmail App Password:** Make sure your Gmail App Password is still valid:
   - Go to: https://myaccount.google.com/apppasswords
   - Check if the password is still active
   - Generate a new one if needed

3. **Environment Variables:** Vercel does NOT automatically copy your `.env` file. You must manually add each variable.

4. **Redeployment Required:** After adding environment variables, you MUST redeploy for changes to take effect.

---

## 🚀 NEXT STEPS

1. **Immediate:** Set up cloud database (Neon/Supabase recommended)
2. **Then:** Add all environment variables to Vercel
3. **Then:** Update OAuth redirect URIs
4. **Then:** Redeploy
5. **Finally:** Test email login

---

## 📞 NEED HELP?

If you're still having issues after following all steps:

1. Share the Vercel function logs
2. Confirm which step you're stuck on
3. Check if database is accessible from Vercel
4. Verify SMTP credentials are correct

---

**Last Updated:** After deployment analysis
**Status:** Waiting for environment variables and database setup
