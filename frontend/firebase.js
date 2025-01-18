// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Конфигурация Firebase (замените на свои данные)
const firebaseConfig = {
  apiKey: "AIzaSyAs8ClQM37UQMU2PJxYj9pGpzc7oOfA1EY",
  authDomain: "chayhana-n1-sultan.firebaseapp.com",
  projectId: "chayhana-n1-sultan",
  storageBucket: "chayhana-n1-sultan.firebasestorage.app",
  messagingSenderId: "522642064282",
  appId: "1:522642064282:web:7948cb929721dd8cfc3023",
  measurementId: "G-51H3RD9P8W",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Authentication
const auth = getAuth(app);

// Экспорт auth и других модулей, если нужно
export { auth, RecaptchaVerifier };
