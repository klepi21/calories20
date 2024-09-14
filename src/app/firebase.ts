// app/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAF9VEsHrnlZ_lpdMPusKaMx96kP5P676c",
    authDomain: "calories-b7d25.firebaseapp.com",
    projectId: "calories-b7d25",
    storageBucket: "calories-b7d25.appspot.com",
    messagingSenderId: "795791863634",
    appId: "1:795791863634:web:a4bff6e0c02bde698ad48b",
    measurementId: "G-9WCWV9NHRP"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
  export const db = getFirestore(app);