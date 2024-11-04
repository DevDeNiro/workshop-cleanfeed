import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error("Missing VITE_FIREBASE_API_KEY env variable");
}

if (!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) {
  throw new Error("Missing VITE_FIREBASE_AUTH_DOMAIN env variable");
}

if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
  throw new Error("Missing VITE_FIREBASE_PROJECT_ID env variable");
}

if (!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) {
  throw new Error("Missing VITE_FIREBASE_STORAGE_BUCKET env variable");
}

if (!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) {
  throw new Error("Missing VITE_FIREBASE_MESSAGING_SENDER_ID env variable");
}

if (!import.meta.env.VITE_FIREBASE_APP_ID) {
  throw new Error("Missing VITE_FIREBASE_APP_ID env variable");
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialisation Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new TwitterAuthProvider();
