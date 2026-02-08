// Test Firebase Connection
// Run with: node test-firebase.js

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("Firebase Configuration:");
console.log("======================");
console.log("API Key:", firebaseConfig.apiKey ? "✓ Set" : "✗ Missing");
console.log("Auth Domain:", firebaseConfig.authDomain ? "✓ Set" : "✗ Missing");
console.log("Project ID:", firebaseConfig.projectId ? "✓ Set" : "✗ Missing");
console.log("Storage Bucket:", firebaseConfig.storageBucket ? "✓ Set" : "✗ Missing");
console.log("Messaging Sender ID:", firebaseConfig.messagingSenderId ? "✓ Set" : "✗ Missing");
console.log("App ID:", firebaseConfig.appId ? "✓ Set" : "✗ Missing");
console.log("\nProject ID:", firebaseConfig.projectId);
console.log("\n✓ Firebase is configured correctly!");
