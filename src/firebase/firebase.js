import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_APIKEY}`,
  authDomain: "donations-38cd0.firebaseapp.com",
  projectId: "donations-38cd0",
  storageBucket: "donations-38cd0.appspot.com",
  messagingSenderId: "744440398955",
  appId: "1:744440398955:web:e120b6fdbeca69d4d29d2e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
