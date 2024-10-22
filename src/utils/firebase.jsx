// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRTk8IeRC9J1T0Q6ZImIlaPpf-vRSuV5g",
  authDomain: "cardhost-03.firebaseapp.com",
  projectId: "cardhost-03",
  storageBucket: "cardhost-03.appspot.com",
  messagingSenderId: "986847230916",
  appId: "1:986847230916:web:d086b1ff5eb1e8c0630291",
  measurementId: "G-5MD5P9BFS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  app,
  analytics,
  db
}

