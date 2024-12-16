// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "roofgroove-ef022.firebaseapp.com",
  projectId: "roofgroove-ef022",
  storageBucket: "roofgroove-ef022.firebasestorage.app",
  messagingSenderId: "32143049305",
  appId: "1:32143049305:web:eee1488a65a2fa4747a748",
  measurementId: "G-4H2L0QW2M1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
