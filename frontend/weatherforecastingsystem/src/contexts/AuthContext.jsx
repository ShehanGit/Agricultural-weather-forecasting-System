// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { getToken, setToken as saveToken, removeToken as deleteToken } from '../Utiliti/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken());

  const setToken = (newToken) => {
    saveToken(newToken);
    setTokenState(newToken);
  };

  const removeToken = () => {
    deleteToken();
    setTokenState(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
