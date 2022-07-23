// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5-McBoow77MjlMfota-SAfyLAIxrJGTg",
  authDomain: "email-auth-9605e.firebaseapp.com",
  projectId: "email-auth-9605e",
  storageBucket: "email-auth-9605e.appspot.com",
  messagingSenderId: "420404470039",
  appId: "1:420404470039:web:c0fce27ef2f2339b15d752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;