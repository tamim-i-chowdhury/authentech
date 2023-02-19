import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

// context name should be start with a capital letter.
export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  // 1. Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Update Name
  const updateName = (name) => {
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // 3. Email Verification
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // 4. Login with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // 5. User Logout
  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    createUser,
    updateName,
    verifyEmail,
    signInWithGoogle,
    logOut,
  };

  useEffect(() => {
    // eta run hobe jekon component mount/rendered hobe
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // eta run hobe jekon component unmount/unrendered hobe
      return () => {
        unsubscribe();
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
