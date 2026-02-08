# Firebase Setup Guide

This project uses Firebase for additional features like real-time database, cloud storage, and analytics.

## Features Available

- **Authentication**: Firebase Authentication (optional, in addition to NextAuth)
- **Firestore**: NoSQL cloud database for real-time data
- **Storage**: Cloud storage for files and media
- **Analytics**: Track user behavior and app performance

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "papermark")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Register Your Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Register app with a nickname (e.g., "Papermark Web")
3. Copy the Firebase configuration object

### 3. Configure Environment Variables

Add the following to your `.env` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Enable Firebase Services

#### Firestore Database
1. Go to "Firestore Database" in Firebase Console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location
5. Click "Enable"

#### Firebase Storage
1. Go to "Storage" in Firebase Console
2. Click "Get started"
3. Choose "Start in test mode" for development
4. Click "Done"

#### Firebase Authentication (Optional)
1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Enable sign-in methods you want to use

## Usage Examples

### Firestore Operations

```typescript
import { getDocument, setDocument, getDocuments, where } from "@/lib/firebase";

// Get a single document
const user = await getDocument("users", "user123");

// Create or update a document
await setDocument("users", "user123", {
  name: "John Doe",
  email: "john@example.com",
});

// Query documents
const activeUsers = await getDocuments("users", [
  where("status", "==", "active"),
]);
```

### Storage Operations

```typescript
import { uploadFile, getFileURL, deleteFile } from "@/lib/firebase";

// Upload a file
const file = event.target.files[0];
const downloadURL = await uploadFile(`documents/${file.name}`, file);

// Get file URL
const url = await getFileURL("documents/example.pdf");

// Delete a file
await deleteFile("documents/example.pdf");
```

### Authentication Operations

```typescript
import { signUpWithEmail, signInWithEmail, signOutUser } from "@/lib/firebase";

// Sign up
await signUpWithEmail("user@example.com", "password123", "John Doe");

// Sign in
await signInWithEmail("user@example.com", "password123");

// Sign out
await signOutUser();
```

## Security Rules

### Firestore Rules (Development)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules (Development)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note**: Update these rules for production to be more restrictive!

## Production Considerations

1. **Security Rules**: Update Firestore and Storage rules to be more restrictive
2. **API Key Restrictions**: Restrict your Firebase API key in Google Cloud Console
3. **Budget Alerts**: Set up billing alerts in Firebase Console
4. **Indexes**: Create composite indexes for complex queries
5. **Monitoring**: Enable Firebase Performance Monitoring

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all Firebase environment variables are set correctly
- Verify your Firebase project is properly configured

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Ensure user is authenticated before accessing protected data

### "Storage object not found"
- Verify the file path is correct
- Check Storage security rules

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Storage Guide](https://firebase.google.com/docs/storage)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
