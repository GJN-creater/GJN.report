import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// ▶️ 개발자 친화적인 콘솔 스타일
console.log(
  "%c🚀 부서별 업무일지 시스템 구동 중...",
  "color: #6366f1; font-size: 14px; font-weight: bold;"
);

// ✅ 안전하게 DOM 요소 확인
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "🚨 Root element not found.\n\nindex.html에 <div id='root'></div>이 있어야 이 앱이 작동합니다."
  );
}

// ✅ React 18의 createRoot 사용
const root = createRoot(rootElement as HTMLElement);

// ✅ App 컴포넌트 마운트
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
