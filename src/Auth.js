import React, { useState, useEffect, createContext } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import { auth } from "./firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });

    return () => unsubscribe();
  }, []);

  if (pending) {
    return (
      <div className="container">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
