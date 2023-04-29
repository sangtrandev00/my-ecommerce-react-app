// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDeJBnECu0Ji7uHxRETP77BbRGLCz7BifM",
  authDomain: "fir-ktcity-course.firebaseapp.com",
  projectId: "fir-ktcity-course",
  storageBucket: "fir-ktcity-course.appspot.com",
  messagingSenderId: "27103254807",
  appId: "1:27103254807:web:b172f63d48dbff6e7a3f52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
export const db = getFirestore(app);
export const auth = getAuth(app);
