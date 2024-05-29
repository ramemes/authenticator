import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth"



export const Authenticated = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading} = useAuth();  
  if (!isAuthenticated || isLoading) {
    return null;
  }
  return <>{children}</>
}

export const Unauthenticated = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth();  
  if (isAuthenticated || isLoading) {
    return null;
  }
  return <>{children}</>
}


export const AuthLoading = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();  
  if (!isLoading) {
    return null;
  }
  return <>{children}</>
}