// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ1sPORoouIdO6u6n9k1R0OZORm4MWlnI",
  authDomain: "water-alert-681b8.firebaseapp.com",
  projectId: "water-alert-681b8",
  storageBucket: "water-alert-681b8.firebasestorage.app",
  messagingSenderId: "780237490759",
  appId: "1:780237490759:web:06e92291b7c4114e207f62",
  measurementId: "G-D95JVV37D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); // ✅ export db
