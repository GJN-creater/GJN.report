import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// HTML 문서 내에 <div id="root"></div> 요소가 있어야 정상적으로 작동함
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("🚨 Root element not found. index.html에 <div id='root'></div>이 있어야 합니다.");
}

// React 18 방식으로 앱 마운트
const root = createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
