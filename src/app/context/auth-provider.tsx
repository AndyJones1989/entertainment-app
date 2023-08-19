"use client";
import React, { useMemo, useState } from "react";

export const AuthContext = React.createContext({
  authDetails: {
    isAuthenticated: false,
    userName: "",
    token: "",
    setAuthenticated: (args: any): any => {},
  },
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [authDetails, setAuthDetails] = useState({
    isAuthenticated: false,
    userName: "",
    token: "",
    setAuthenticated: (args: any): any => {},
  });

  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return {
          authDetails: {
            isAuthenticated: authDetails.isAuthenticated,
            userName: authDetails.userName,
            token: authDetails.token,
            setAuthenticated: setAuthDetails,
          },
        };
      }, [authDetails])}
    >
      {children}
    </AuthContext.Provider>
  );
};
