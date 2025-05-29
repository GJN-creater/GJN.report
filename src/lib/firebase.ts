// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // 🔹 Firestore 추가

const firebaseConfig = {
  apiKey: "AIzaSyAoojohNyinBZKHC1xeplS-i1tbTpzxuPY",
  authDomain: "my-report-f4176.firebaseapp.com",
  projectId: "my-report-f4176",
  storageBucket: "my-report-f4176.firebasestorage.app",
  messagingSenderId: "772097498731",
  appId: "1:772097498731:web:3afce582a9a72510ce9b2e",
  measurementId: "G-2Z29LTD4N7"
};

// 🔹 Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 🔹 Firestore 및 Storage 인스턴스 export
export const db = getFirestore(app);       // ✅ 이제 db 사용 가능!
export const storage = getStorage(app);
