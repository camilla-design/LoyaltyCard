// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWU2-YXOHwRX3qVqv-B5r8vrzSs_r4JNk",
  authDomain: "loyaltycardstudiob.firebaseapp.com",
  projectId: "loyaltycardstudiob",
  storageBucket: "loyaltycardstudiob.firebasestorage.app",
  messagingSenderId: "537225393299",
  appId: "1:537225393299:web:e00478ec2c3e288f7d0966",
  measurementId: "G-GVNK9WQHJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);