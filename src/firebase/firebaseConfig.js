import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc,getDoc,onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCIkU-6fZHvEajeC1TUJkELGhZPJ5r4jQ",
  authDomain: "antivirus-b05d0.firebaseapp.com",
  projectId: "antivirus-b05d0",
  storageBucket: "antivirus-b05d0.firebasestorage.app",
  messagingSenderId: "301592109424",
  appId: "1:301592109424:web:dc4e8e48ed4a9df74bafb5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); 

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc,getDoc, doc,storage,onSnapshot };
