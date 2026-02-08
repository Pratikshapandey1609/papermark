// Export Firebase configuration
export { app, auth, db, storage, analytics } from "./config";

// Export Firestore utilities
export {
  getDocument,
  getDocuments,
  setDocument,
  updateDocument,
  deleteDocument,
  where,
  orderBy,
  limit,
} from "./firestore";

// Export Storage utilities
export {
  uploadFile,
  uploadFileWithProgress,
  getFileURL,
  deleteFile,
  listFiles,
} from "./storage";

// Export Auth utilities
export {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  resetPassword,
  updateUserProfile,
  getCurrentUser,
} from "./auth";
