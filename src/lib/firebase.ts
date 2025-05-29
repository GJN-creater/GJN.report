// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "너의 키",
  authDomain: "my-report-f4176.firebaseapp.com",
  projectId: "my-report-f4176",
  storageBucket: "my-report-f4176.appspot.com",
  messagingSenderId: "너의 값",
  appId: "너의 값"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
