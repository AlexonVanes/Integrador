import { app } from "../common/FirebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword
} from "firebase/auth";
import deleteUser from '../domain/service/PerfilService'

export const auth = getAuth(app);


export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function sendResetPasswordEmail(email) {
  return sendPasswordResetEmail(auth, email);
}

export function getAuthInstance() {
  return auth;
}

export function observeAuthState(setUserFunction) {
  return auth.onAuthStateChanged(user => {
    setUserFunction(user);
  });
}

export async function deleteCurrentUser() {
  const user = auth.currentUser;
  if (!user) {
    console.log("No authenticated user found.");
    return;
  }
  
  try {
    await deleteUser(user); 
  } catch (error) {
    throw error;
  }
}
