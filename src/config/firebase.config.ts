import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB58fdfyA_42_Rtnk0l_pBebTx3qAibAPk",
    authDomain: "club-ecommerce-d6ae2.firebaseapp.com",
    projectId: "club-ecommerce-d6ae2",
    storageBucket: "club-ecommerce-d6ae2.firebasestorage.app",
    messagingSenderId: "800254634526",
    appId: "1:800254634526:web:746b3a26622a240302dc0f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
