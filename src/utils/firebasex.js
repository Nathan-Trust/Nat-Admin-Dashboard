// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDtTQTDk8EzSM-M3eWnF3-v2mQemXtMaQ",
  authDomain: "dash-firebase-ee2fb.firebaseapp.com",
  projectId: "dash-firebase-ee2fb",
  storageBucket: "dash-firebase-ee2fb.appspot.com",
  messagingSenderId: "135943607808",
  appId: "1:135943607808:web:ca60405a487e65183deae5",
  measurementId: "G-VNNKZXBXDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const chatauth = getAuth()
const analytics = getAnalytics(app);