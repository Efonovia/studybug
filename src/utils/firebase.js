// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfWetmTuVbZ1_hK7U3yDfQk8Y-J3jiqeY",
  authDomain: "studybug-203cf.firebaseapp.com",
  projectId: "studybug-203cf",
  storageBucket: "studybug-203cf.appspot.com",
  messagingSenderId: "558814410693",
  appId: "1:558814410693:web:124652b3811c22fb8bbdac",
  measurementId: "G-7GT6SBSX35"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const auth = getAuth() 