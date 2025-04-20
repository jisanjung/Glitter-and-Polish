import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID;
 
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

export const postOrder = async (payload) => {
    if (!payload) {
        return false;
    }
    try {
        const res = await addDoc(collection(db, 'orders'), { ...payload });
        
        console.log(res.id ? 'ORDER_SUCCESS' : 'ORDER_FAILED');
        return Boolean(res.id); // 'id' should be in response if successful
    } catch (err) {
        console.error('ERROR_POSTING_AN_ORDER_TO_FIREBASE', err);
    }
};
