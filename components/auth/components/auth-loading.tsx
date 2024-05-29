import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth"

export const AuthLoading = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();  
  if (!isLoading) {
    return null;
  }
  return <>{children}</>
}