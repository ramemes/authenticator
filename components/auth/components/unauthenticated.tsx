import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth"

export const Unauthenticated = ({ children }: { children: ReactNode }) => {
  const {isAuthenticated} = useAuth();  
  if (isAuthenticated) {
    return null;
  }
  return <>{children}</>
}