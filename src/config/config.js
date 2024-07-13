// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE5vydLOJp65xjb5kMFy6lNnx-YgibYJw",
  authDomain: "art-website-faee5.firebaseapp.com",
  databaseURL: "https://art-website-faee5-default-rtdb.firebaseio.com",
  projectId: "art-website-faee5",
  storageBucket: "art-website-faee5.appspot.com",
  messagingSenderId: "767929993238",
  appId: "1:767929993238:web:a8ce3b5e5b52a95f51cd37",
  measurementId: "G-39JDW83HBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const imageDb = getStorage(app);

export {imageDb}