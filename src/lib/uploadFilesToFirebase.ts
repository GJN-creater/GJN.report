// src/lib/uploadFilesToFirebase.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFilesToFirebase = async (files: File[]) => {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const timestamp = Date.now();
    const storageRef = ref(storage, `reports/${timestamp}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    uploadedUrls.push(url);
  }

  return uploadedUrls;
};
