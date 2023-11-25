import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebase-creds.js";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
