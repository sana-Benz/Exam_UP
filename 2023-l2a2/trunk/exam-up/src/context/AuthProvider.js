import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, role: null });

  const login = (user, role) => {
    setAuth({ isAuthenticated: true, user, role });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
