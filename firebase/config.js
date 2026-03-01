// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzoXMpBcMS9GhMy_s4a8nqbN_4PRXSePI",
  authDomain: "studentwellnessapp-bf2e1.firebaseapp.com",
  projectId: "studentwellnessapp-bf2e1",
  storageBucket: "studentwellnessapp-bf2e1.firebasestorage.app",
  messagingSenderId: "486003488553",
  appId: "1:486003488553:web:128bd20f270067d89e6938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);