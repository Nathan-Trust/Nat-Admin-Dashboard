// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import {getStorage} from 'firebase/storage'
//import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7khXqH2eBsvmIvltqn56-i9vhsmVKsX8",
  authDomain: "nats-firebase.firebaseapp.com",
  projectId: "nats-firebase",
  storageBucket: "nats-firebase.appspot.com",
  messagingSenderId: "656021208845",
  appId: "1:656021208845:web:6f1e1e99233717428a7a44",
  measurementId: "G-V4CQ2P4QT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export default app;