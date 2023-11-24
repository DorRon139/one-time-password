import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import credentials from "../firebase-creds.json" assert { type: "json" };

const serviceAccount = credentials;

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const firebaseAuth = getAuth();

export { db, firebaseAuth };
