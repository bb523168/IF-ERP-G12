
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './firebase'; // 確保 Firebase 在 App 渲染前初始化

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// 建立錯誤邊界或簡單的異常捕獲以防止白屏
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global error caught:", message, error);
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
