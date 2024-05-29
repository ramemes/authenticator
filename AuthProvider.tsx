"use client";

import { ReactElement, useEffect } from "react";
import { Loading } from "./components/auth/components/loading";
import { Authenticated, Unauthenticated, AuthLoading } from "./components/auth/components/auth-state";

import { useAuth } from "./components/auth/utils/useAuth";

import { Login } from "./components/auth/components/login";

interface AuthProviderProps {
  children: React.ReactNode
}



export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const { isLoading, isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  if (isLoading) {
    return (
      <AuthLoading>
        <Loading/>  
      </AuthLoading>
    )
  }

  return (
    <>
      <Authenticated>
        {children}
      </Authenticated>
      
      <Unauthenticated>
        <Login/>
      </Unauthenticated>
    </>
  )
}