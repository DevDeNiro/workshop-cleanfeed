import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
// import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log("firebaseConfig", firebaseConfig);

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new TwitterAuthProvider();
