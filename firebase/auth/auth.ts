import { Dispatch, SetStateAction } from "react";
import firebase_app from "../config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
    console.log("hi");
    const userCredential = await signInWithPopup(auth, provider);
    setWaitingForLogin(false);
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
  }
}

// export const signUpUserWithEmailAndPassword = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     console.log(userCredential.user);
//     console.log(auth);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signInUserWithEmailAndPassword = async (email, password) => {
//   try {
//     console.log("hi");
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log(userCredential.user);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
