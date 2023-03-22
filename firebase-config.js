// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBI2eJiXjqBCyapZHFUhBozyI7pV_6yITE",
    authDomain: "realtime-tech-chat.firebaseapp.com",
    projectId: "realtime-tech-chat",
    storageBucket: "realtime-tech-chat.appspot.com",
    messagingSenderId: "60956243274",
    appId: "1:60956243274:web:5744e6a1f16e99a12cfdb3",
    measurementId: "G-1Y626X2B84",
    databaseURL:
        "https://realtime-tech-chat-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const db = getDatabase();
