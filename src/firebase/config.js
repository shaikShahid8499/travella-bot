import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBumRH7GWfezybOqPIYqtlB1Zze-UQ63jA",
  authDomain: "travelbot-7b67d.firebaseapp.com",
  projectId: "travelbot-7b67d",
  storageBucket: "travelbot-7b67d.firebasestorage.app",
  messagingSenderId: "738162882495",
  appId: "1:738162882495:web:748b3e898e113e48ed530a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 