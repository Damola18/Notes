// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA46QroBIVsS2iijFBLkH9zkztHfZ2PXE",
  authDomain: "evernotess.firebaseapp.com",
  projectId:  "evernotess",
  storageBucket:"evernotess.appspot.com",
  messagingSenderId: "591720378950",
  appId:  "1:591720378950:web:9aa7919653e3d98cfb1047",
  measurementId: "G-KBSPE6HRW0"
};

// API_KEY = "AIzaSyBA46QroBIVsS2iijFBLkH9zkztHfZ2PXE",
// AUTH_DOMAIN =  "evernotess.firebaseapp.com",
// PROJECT_ID =  "evernotess",
// STORAGE_BUCKET =  "evernotess.appspot.com",
// MESSAGING_SENDER_ID = "591720378950",
// APP_ID = "1:591720378950:web:9aa7919653e3d98cfb1047",
// MEASUREMENT_ID = "G-KBSPE6HRW0"

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)