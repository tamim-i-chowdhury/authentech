import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
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
  const [loading, setLoading] = useState(true);

  // 1. Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Update Name
  const updateName = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // 3. Email Verification
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };

  // 4. Login with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 5. User Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 6. Login with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 7. Reset Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    createUser,
    updateName,
    verifyEmail,
    signInWithGoogle,
    logOut,
    signIn,
    loading,
    resetPassword,
  };

  useEffect(() => {
    // eta run hobe jekon component mount/rendered hobe
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

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
