import { Dispatch, SetStateAction } from "react";
import firebase_app from "../config";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";

export const auth = getAuth(firebase_app);

export const getCurrentUser = async () => {
  const promisifiedOnAuthStateChanged = (auth: Auth) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
  };

  const uid = await promisifiedOnAuthStateChanged(auth);
  return uid;
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (setWaitingForLogin: Dispatch<SetStateAction<boolean>>) => {
    try {
    const userCredential = await signInWithPopup(auth, provider);
    setWaitingForLogin(false);
  } catch (error) {
    console.log(error);
  }
}

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
