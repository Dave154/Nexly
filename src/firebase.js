// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqO2H16ElI7o5C7I7ZX0U0X7gBHr2c_-E",
  authDomain: "nexly-d5c6d.firebaseapp.com",
  projectId: "nexly-d5c6d",
  storageBucket: "nexly-d5c6d.appspot.com",
  messagingSenderId: "735205454419",
  appId: "1:735205454419:web:a45f13010b4cb091dd0ca6",
  measurementId: "G-G187Q0EP0W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage =getStorage()
export const db = getFirestore();
export const messaging = getMessaging(app);

// Add the public key generated from the console here.
// export const generateToken=async()=>{
// const permision= await Notification.requestPermission()
// console.log(permision)
// if (permision === 'granted') {
//     const token = await getToken(messaging, {
//     vapidKey:'BITx7HLgcoea82YDWkX9AmDmpssLAJz8WdHcH-h70aqAcZDe7r7p7jNXXLE9ZCCtn2Zgrr2vDoUYnUNqrg-6_4c'
//  }) 
//     console.log(token)
// }

// }
  