"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AuthLoading, Authenticated, Unauthenticated } from "../components/auth/auth-state";
import { Loading } from "../components/auth/loading";
import { Login } from "../components/auth/login";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;

}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({children}: AuthProviderProps) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated, setIsLoading }}>
      {isLoading ? (
        <AuthLoading>
          <Loading />
        </AuthLoading>
      ) : isAuthenticated ? (
        <Authenticated>
          {children}
        </Authenticated>
      ) : (
        <Unauthenticated>
          <Login />
        </Unauthenticated>
      )}
    </AuthContext.Provider>
  );
}