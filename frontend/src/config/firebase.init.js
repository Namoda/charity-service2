// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMAq839h0Wt4F4AtTLcJj9bnTDgU8DvLw",
  authDomain: "charity-service-demo.firebaseapp.com",
  projectId: "charity-service-demo",
  storageBucket: "charity-service-demo.appspot.com",
  messagingSenderId: "739239516567",
  appId: "1:739239516567:web:cf32bae2fc7feb4ec8ccd2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);