// src/lib/uploadFilesToFirebase.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * 여러 개의 파일을 Firebase Storage에 업로드하고, 각 파일의 다운로드 URL을 반환합니다.
 * @param files File[] - 업로드할 파일 배열
 * @returns Promise<string[]> - 업로드된 각 파일의 다운로드 URL 목록
 */
export const uploadFilesToFirebase = async (files: File[]): Promise<string[]> => {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    // 고유한 파일 이름 생성 (타임스탬프 + 원래 파일명)
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `uploads/${fileName}`);

    // 업로드 실행
    const snapshot = await uploadBytes(storageRef, file);

    // 업로드된 파일의 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);

    uploadedUrls.push(downloadURL);
  }

  return uploadedUrls;
};
