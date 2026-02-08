import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Get a single document from Firestore
 */
export async function getDocument(
  collectionName: string,
  documentId: string
): Promise<DocumentData | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

/**
 * Get multiple documents from Firestore with optional filters
 */
export async function getDocuments(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<DocumentData[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

/**
 * Create or update a document in Firestore
 */
export async function setDocument(
  collectionName: string,
  documentId: string,
  data: DocumentData
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error setting document:", error);
    throw error;
  }
}

/**
 * Update a document in Firestore
 */
export async function updateDocument(
  collectionName: string,
  documentId: string,
  data: Partial<DocumentData>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

/**
 * Delete a document from Firestore
 */
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}

// Export query helpers for convenience
export { where, orderBy, limit };
