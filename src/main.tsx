import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement | null;

if (!rootElement) {
  throw new Error('🚨 Root element not found. index.html에 <div id="root" />가 필요합니다.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
