
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDIw9bRwHWCc_QkheD_hwt1Y-t48A9eQYo",
  authDomain: "react-authentication-d6d01.firebaseapp.com",
  projectId: "react-authentication-d6d01",
  storageBucket: "react-authentication-d6d01.appspot.com",
  messagingSenderId: "575495327132",
  appId: "1:575495327132:web:e7482684c1fd867d14cc59",
  measurementId: "G-2NZ83M7NKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth( );
export const storage = getStorage();
export const db =  getFirestore()
export default app;

