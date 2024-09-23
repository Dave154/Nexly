// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuHTzgThOQjfecTi6Jb30uiRe-bXXkfJk",
  authDomain: "nexly-695cf.firebaseapp.com",
  projectId: "nexly-695cf",
  storageBucket: "nexly-695cf.appspot.com",
  messagingSenderId: "620874900423",
  appId: "1:620874900423:web:12d46a96b4355ed93eefe2",
  measurementId: "G-3K5NPDVKE8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage =getStorage()
export const db = getFirestore();