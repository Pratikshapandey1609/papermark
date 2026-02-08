"use client";

import { useState } from "react";
import {
  uploadFile,
  uploadFileWithProgress,
  getDocument,
  setDocument,
} from "@/lib/firebase";

/**
 * Example component demonstrating Firebase usage
 * This is a reference implementation - adapt to your needs
 */
export default function FirebaseExample() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  // Example: Upload file to Firebase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Simple upload
      const url = await uploadFile(`uploads/${file.name}`, file);
      setFileUrl(url);
      console.log("File uploaded:", url);

      // Or upload with progress tracking
      const uploadTask = uploadFileWithProgress(
        `uploads/${file.name}`,
        file,
        (progress) => {
          setUploadProgress(progress);
          console.log(`Upload progress: ${progress}%`);
        }
      );

      // Wait for upload to complete
      await uploadTask;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Example: Save data to Firestore
  const handleSaveData = async () => {
    try {
      await setDocument("examples", "doc1", {
        title: "Example Document",
        createdAt: new Date().toISOString(),
        fileUrl: fileUrl,
      });
      console.log("Data saved to Firestore");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  // Example: Read data from Firestore
  const handleReadData = async () => {
    try {
      const doc = await getDocument("examples", "doc1");
      console.log("Document data:", doc);
    } catch (error) {
      console.error("Read failed:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Firebase Example</h2>

      {/* File Upload Example */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload File</label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm"
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress.toFixed(0)}%
            </div>
          </div>
        )}
        {fileUrl && (
          <p className="text-sm text-green-600">
            File uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">View</a>
          </p>
        )}
      </div>

      {/* Firestore Example */}
      <div className="space-x-2">
        <button
          onClick={handleSaveData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save to Firestore
        </button>
        <button
          onClick={handleReadData}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Read from Firestore
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Check the browser console for results
      </p>
    </div>
  );
}
