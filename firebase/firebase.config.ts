// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  appId: process.env.NEXT_PUBLIC_apiKey,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const logoutFirebase = () => {
  return auth.signOut();
};
const signUp = (email: string, password: string) => {
  // create user in firebase with name, email , password
  return createUserWithEmailAndPassword(auth, email, password);
};
export default app;
export { db, auth, signIn, logoutFirebase, signUp };
