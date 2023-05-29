// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb7xoSVKkLIuCpUlM4UCqoe-d56S02yY4",
  authDomain: "react-http-c27a0.firebaseapp.com",
  databaseURL: "https://react-http-c27a0-default-rtdb.firebaseio.com",
  projectId: "react-http-c27a0",
  storageBucket: "react-http-c27a0.appspot.com",
  messagingSenderId: "513843601111",
  appId: "1:513843601111:web:729be21eb9b5220195da92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export {app, functions};