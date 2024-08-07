// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estateease-9d262.firebaseapp.com",
  projectId: "estateease-9d262",
  storageBucket: "estateease-9d262.appspot.com",
  messagingSenderId: "67777074516",
  appId: "1:67777074516:web:ceb811a0b376c77d9b64c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);