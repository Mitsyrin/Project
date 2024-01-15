
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBP_pJkU_FvVjhyymTlYdrtvibxA8mhiw8",
  authDomain: "reactnativeexamplet-5a2dd.firebaseapp.com",
  projectId: "reactnativeexamplet-5a2dd",
  storageBucket: "reactnativeexamplet-5a2dd.appspot.com",
  messagingSenderId: "62217122343",
  appId: "1:62217122343:web:0df21b8687d42dad375402",
  measurementId: "G-M98WRQ2TEK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const database = getDatabase(app);
