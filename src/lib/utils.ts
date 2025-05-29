/**
 * 조건부 Tailwind 클래스 결합 유틸
 * 사용 예시:
 * cn("btn", isActive && "btn-primary", isDisabled && "opacity-50")
 */
export function cn(...inputs: Array<string | undefined | null | false | 0 | Record<string, boolean>>): string {
  return inputs
    .map((input) => {
      if (typeof input === "string" || typeof input === "number") {
        return input;
      }

      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }

      return "";
    })
    .filter(Boolean)
    .join(" ");
}

// -------------------- Firebase 연동 --------------------

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  orderBy,
  query,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

/**
 * Firestore에 일지 저장
 */
export const saveReport = async (data: {
  writer: string;
  department: string;
  content: string;
  note: string;
  createdAt: string;
  files: string[];
  readers?: string[];
}) => {
  await addDoc(collection(db, "reports"), {
    writer: data.writer,
    department: data.department,
    content: data.content,
    note: data.note,
    createdAt: Timestamp.fromDate(new Date(data.createdAt)),
    files: data.files,
    readers: data.readers || [],
  });
};

/**
 * Firestore에서 저장된 일지 목록 불러오기
 */
export const fetchReports = async () => {
  const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      dept: d.department,
      content: d.content,
      note: d.note,
      readers: d.readers || [],
      createdAt: d.createdAt.toDate().toISOString().slice(0, 10),
      files: d.files || [],
    };
  });
};

/**
 * Firestore의 특정 일지 문서에 readers 배열 업데이트
 */
export const updateReportReaders = async (id: string, readers: string[]) => {
  const ref = doc(db, "reports", id);
  await updateDoc(ref, { readers });
};

/**
 * Firestore 문서 삭제 (id 기준)
 */
export const deleteReport = async (id: string) => {
  const ref = doc(db, "reports", id);
  await deleteDoc(ref);
};

/**
 * Firestore 문서 수정
 */
export const updateReport = async (
  id: string,
  updated: Partial<{
    department: string;
    content: string;
    note: string;
    files: string[];
    readers: string[];
  }>
) => {
  const ref = doc(db, "reports", id);
  await updateDoc(ref, updated);
};
