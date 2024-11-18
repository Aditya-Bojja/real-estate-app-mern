// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-912ba.firebaseapp.com",
  projectId: "real-estate-app-912ba",
  storageBucket: "real-estate-app-912ba.firebasestorage.app",
  messagingSenderId: "798459835552",
  appId: "1:798459835552:web:c80559f7434f83f5ab45c5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
