// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7VO3AWMUPA_VG7Arvhlyw7o-BaKNIhM8",
  authDomain: "transport-bdfc0.firebaseapp.com",
  databaseURL: "https://transport-bdfc0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "transport-bdfc0",
  storageBucket: "transport-bdfc0.firebasestorage.app",
  messagingSenderId: "594495582953",
  appId: "1:594495582953:web:db1561428dee6b206e3678",
  measurementId: "G-42852FL15Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export const db    = getFirestore(app);     // 🔸 Firestore (optional)
 
