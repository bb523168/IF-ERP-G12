
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 這裡整合您提供的 Firebase 配置
const firebaseConfig = {
  // 請確認此處已填入您的實際配置資訊
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-id",
  appId: "your-app-id"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("Firebase 服務已連線：如果建築師事務所資料庫");
