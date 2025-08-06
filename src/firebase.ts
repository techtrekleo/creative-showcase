// Import the functions you need from the SDKs you need
import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration loaded from environment variables
// Vite exposes env variables on the `import.meta.env` object.
// VITE_ is a required prefix for them to be exposed to the client-side code.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = firebaseAuth.getAuth(app);
export const db = getFirestore(app);