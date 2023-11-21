// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWVnRBXd9YsUED2Iv0UZPi19Gf3NluS_c",
  authDomain: "notion-it-ver.firebaseapp.com",
  projectId: "notion-it-ver",
  storageBucket: "notion-it-ver.appspot.com",
  messagingSenderId: "1075113053285",
  appId: "1:1075113053285:web:95953972f4b24a45064a8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, storage, firestore };