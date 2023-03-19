// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIXbAQsPo7lLo1zTAxEN0Wd0e2yBszL4o",
  authDomain: "pokedex-4ebd4.firebaseapp.com",
  databaseURL: "https://pokedex-4ebd4-default-rtdb.firebaseio.com",
  projectId: "pokedex-4ebd4",
  storageBucket: "pokedex-4ebd4.appspot.com",
  messagingSenderId: "877769722279",
  appId: "1:877769722279:web:47ce8b745fb05e2c114e82",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
