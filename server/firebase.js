import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

const FIREBASE_API_KEY = "AIzaSyB1qMcHrknhqUrvUH3ryjDX-gQZQycTOFs";
const FIREBASE_AUTH_DOMAIN = "glitterandpolish-5c50b.firebaseapp.com";
const FIREBASE_PROJECT_ID = "glitterandpolish-5c50b";
const FIREBASE_STORAGE_BUCKET = "glitterandpolish-5c50b.firebasestorage.app";
const FIREBASE_MESSAGING_SENDER_ID = "206578063208";
const FIREBASE_APP_ID = "1:206578063208:web:620972356ff9ed7a9ba8dd";
const FIREBASE_MEASUREMENT_ID = "G-F1ECYR85SX";
 
const firebaseConfig = { 
    apiKey: FIREBASE_API_KEY, 
    authDomain: FIREBASE_AUTH_DOMAIN, 
    projectId: FIREBASE_PROJECT_ID, 
    storageBucket: FIREBASE_STORAGE_BUCKET, 
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID, 
    appId: FIREBASE_APP_ID, 
    measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);