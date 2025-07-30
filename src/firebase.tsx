import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC3zP9i0_V6_eZsSKQdqOn5EZWHSSoaj8k",
  authDomain: "ts-auth-3b9e5.firebaseapp.com",
  projectId: "ts-auth-3b9e5",
  storageBucket: "ts-auth-3b9e5.firebasestorage.app",
  messagingSenderId: "197996164102",
  appId: "1:197996164102:web:5b5009568747bdc97d3f87",
};
console.log();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, auth, db, googleProvider, facebookProvider };
// https://ts-auth-3b9e5.firebaseapp.com/__/auth/handler