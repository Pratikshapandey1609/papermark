# OAuth Configuration Status

## Current Status

### Google OAuth
- **Status**: **NOT CONFIGURED** (using placeholder values)
- **Client ID**: `your_google_client_id_here` (placeholder)
- **Client Secret**: `your_google_client_secret_here` (placeholder)
- **Buttons**: ✅ Visible on login/register pages
- **Behavior**: Will show error if clicked without proper credentials

### LinkedIn OAuth
- **Status**: **NOT CONFIGURED**
- **Client ID**: Not set
- **Client Secret**: Not set
- **Buttons**: ✅ Visible on login/register pages
- **Behavior**: Will show error if clicked without proper credentials

## What This Means

⚠️ **Google Sign-In Button** - Visible but will show error when clicked (needs credentials)
⚠️ **LinkedIn Sign-In Button** - Visible but will show error when clicked (needs credentials)
✅ **Email Sign-In** - Fully working with SMTP/Gmail

## Current Working Authentication

✅ **Email/Magic Link Authentication** - Fully functional
- SMTP configured with Gmail
- Verification emails are sent
- Users can sign in without OAuth

## How to Enable Google OAuth

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

### Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Configure:
   - **Name**: Papermark Local Development
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000`
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/callback/google`
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

### Step 3: Update .env File

Replace these lines in your `.env`:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

With your actual credentials:
```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_actual_secret_here
```

### Step 4: Restart Your Server

After updating the `.env` file, restart your development server:
```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

The Google sign-in will now work!

## How to Test OAuth

1. Go to `http://localhost:3000/login`
2. Click "Continue with Google"
3. If credentials are configured: You'll be redirected to Google's login page
4. If credentials are NOT configured: You'll see an error
5. After signing in with Google, you'll be redirected back to your app

## Common Issues

### Issue: "Error 400: redirect_uri_mismatch"
**Solution**: Make sure `http://localhost:3000/api/auth/callback/google` is added to Authorized redirect URIs in Google Cloud Console

### Issue: "Error 401: invalid_client"
**Solution**: Double-check that your Client ID and Client Secret are correct in the `.env` file

### Issue: "Configuration" error when clicking OAuth button
**Solution**: This means credentials are not configured. Add valid credentials to `.env` and restart the server

## LinkedIn OAuth Setup (Optional)

If you want to enable LinkedIn sign-in:

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
4. Get Client ID and Client Secret
5. Add to `.env`:
```env
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

## Summary

- ✅ OAuth buttons are visible on login/register pages
- ⚠️ OAuth will show errors until you configure credentials
- ✅ Email authentication works perfectly without OAuth
- 📝 Follow the steps above to enable Google/LinkedIn sign-in

**You can use the app right now with email authentication, and add OAuth credentials when ready!**
