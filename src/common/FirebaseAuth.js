import { app } from "./FirebaseConfig";
import {
  getAuth, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  createUserWithEmailAndPassword
} from "firebase/auth";

export const auth = getAuth(app);

// Aqui, garanta que sendPasswordResetEmail está sendo exportado
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail };
