# Email Testing Guide for Papermark

## Current Status

✅ **SMTP Configuration is Working!**
- Test script successfully sent email via Gmail SMTP
- SMTP credentials are correctly configured in `.env`
- Connection to Gmail SMTP server verified

## What I Fixed

### 1. Added Comprehensive Logging
I've added detailed console logging throughout the email sending flow to help diagnose issues:

- **`lib/resend.ts`**: Logs when SMTP transporter is created, which email method is used, and success/failure
- **`pages/api/auth/[...nextauth].ts`**: Logs when NextAuth triggers email sending
- **`lib/emails/send-verification-request.ts`**: Logs the verification email process

### 2. SMTP Configuration
Your `.env` file has the correct SMTP settings:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com
SEND_EMAILS=true
```

## How to Test Email Sending

### 🎯 EASIEST METHOD: Use the Test Page

I've created a dedicated test page for you:

1. **Make sure the dev server is running**: `npm run dev`

2. **Open your browser** and go to: **http://localhost:3000/test-email.html**

3. **Click "Check Configuration"** to verify environment variables are loaded

4. **Click "Send Test Email"** to send a test email to vprisha272@gmail.com

5. **Watch the terminal** where `npm run dev` is running for detailed logs

6. **Check your email inbox** (and spam folder!)

This test page will show you exactly what's happening and help identify any issues.

---

### Test 1: Login with Email (Main Flow)

1. **Open your browser** and go to: http://localhost:3000/login

2. **Enter your email address** (vprisha272@gmail.com or any email)

3. **Click "Continue with Email"**

4. **Check the terminal/console** where `npm run dev` is running. You should see logs like:
   ```
   🔧 [createSMTPTransporter] Checking SMTP configuration...
   🔧 [createSMTPTransporter] SMTP_HOST: smtp.gmail.com
   ✅ [createSMTPTransporter] Creating SMTP transporter...
   🔑 [NextAuth] sendVerificationRequest called
   🔑 [NextAuth] Identifier: your-email@example.com
   📧 [sendEmail] Starting email send process...
   📧 [sendEmail] Using SMTP transporter
   ✅ [sendEmail] SMTP email sent successfully!
   ```

5. **Check your email inbox** (vprisha272@gmail.com) for the verification email

6. **If you don't see logs**, the module might not be loaded yet. Try:
   - Refresh the page
   - Click "Continue with Email" again
   - Check the browser console for any errors

### Test 2: Direct SMTP Test (Already Passed ✅)

Run the test script I created:
```bash
cd papermark-main
node test-smtp.js
```

This should show:
```
✅ SMTP connection verified successfully!
✅ Email sent successfully!
```

## Troubleshooting

### Issue 1: No Logs Appearing

**Problem**: When you click "Continue with Email", no logs appear in the terminal.

**Solution**:
1. Make sure the dev server is running: `npm run dev`
2. The logs will only appear when the email module is loaded (first time you try to send an email)
3. Check the browser console (F12) for any JavaScript errors
4. Verify the API route is being called: Look for a request to `/api/auth/signin/email` in the Network tab

### Issue 2: "Error sending email - try again?"

**Problem**: The UI shows an error message.

**Solution**:
1. Check the terminal logs for the specific error
2. Common causes:
   - SMTP credentials incorrect (but we verified they work!)
   - Gmail blocking the app (check your Gmail security settings)
   - Network/firewall issues

### Issue 3: Email Not Received

**Problem**: Logs show success but no email in inbox.

**Solution**:
1. **Check Spam folder** - Gmail might filter it
2. **Check Gmail "Less secure app access"** settings:
   - Go to: https://myaccount.google.com/security
   - Make sure "Less secure app access" is ON (if available)
   - Or use an "App Password" instead of your regular password
3. **Verify the email address** in the logs matches your inbox
4. **Wait a few minutes** - sometimes there's a delay

### Issue 4: Gmail App Password

If you're using 2-Factor Authentication on Gmail, you need an App Password:

1. Go to: https://myaccount.google.com/apppasswords
2. Create a new App Password for "Mail"
3. Copy the 16-character password
4. Update `.env`:
   ```
   SMTP_PASS=your-16-char-app-password-here
   ```
5. Restart the dev server

## What to Check Next

1. **Open the browser** and go to http://localhost:3000/login
2. **Open the terminal** where `npm run dev` is running
3. **Enter an email** and click "Continue with Email"
4. **Watch the terminal** for the logs I added
5. **Share the logs with me** if you see any errors

## Expected Behavior

When everything works correctly:

1. You enter your email on the login page
2. Click "Continue with Email"
3. Terminal shows:
   - SMTP configuration detected
   - Email sending process started
   - SMTP transporter used
   - Email sent successfully
4. You receive an email with subject "Welcome to Papermark!"
5. Email contains a verification link
6. Clicking the link logs you in

## Files Modified

1. `lib/resend.ts` - Added logging to email sending function
2. `pages/api/auth/[...nextauth].ts` - Added logging to NextAuth email provider
3. `lib/emails/send-verification-request.ts` - Added logging to verification email
4. `test-smtp.js` - Created test script (already verified working ✅)
5. `pages/api/test-email-config.ts` - API endpoint to check email configuration
6. `pages/api/test-send-email.ts` - API endpoint to send test emails
7. `public/test-email.html` - **Interactive test page** (use this first!)

## Quick Start

1. Make sure dev server is running: `npm run dev`
2. Open: **http://localhost:3000/test-email.html**
3. Click "Check Configuration"
4. Click "Send Test Email"
5. Watch terminal and check your inbox!

## Next Steps

1. Test the login flow with email
2. Check the terminal logs
3. If you see errors, share them with me
4. If no logs appear, we need to investigate why the module isn't loading

---

**Note**: The SMTP test script (`test-smtp.js`) already confirmed that:
- ✅ SMTP credentials are correct
- ✅ Connection to Gmail works
- ✅ Email can be sent successfully

So the issue is likely in how the Next.js application loads environment variables or how the email module is initialized.
