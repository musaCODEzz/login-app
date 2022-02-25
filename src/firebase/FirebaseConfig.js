import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA-CqVeEk-DAp4N3QIpKC50XRKFMGdIAZM",
  authDomain: "login-app-540e1.firebaseapp.com",
  projectId: "login-app-540e1",
  storageBucket: "login-app-540e1.appspot.com",
  messagingSenderId: "715312953378",
  appId: "1:715312953378:web:74cf8cd23773448309327b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signup = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password);
}



export const signout = () =>{
      return signOut(auth);
}


export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}


export const forgotpass = (email) => {
  return sendPasswordResetEmail(auth, email);

}

//custom react hook

export const useAuth = () =>{
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged( auth, user => setCurrentUser(user));
    return unsub
  }, []);

  return currentUser;

}
