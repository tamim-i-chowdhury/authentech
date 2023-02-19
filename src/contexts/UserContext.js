import React, { createContext, useState } from "react";

// context name should be start with a capital letter.
const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default UserContext;
