// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCy1fDZYVkOR0OwbT3q447kxwHtKkQJYG0",
  authDomain: "crud-react-2c0b9.firebaseapp.com",
  projectId: "crud-react-2c0b9",
  storageBucket: "crud-react-2c0b9.appspot.com",
  messagingSenderId: "740596850015",
  appId: "1:740596850015:web:fafb9d518b2853af446aea",
  measurementId: "G-QQ2ENKKHR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);