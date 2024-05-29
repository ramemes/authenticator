import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth"

export const Authenticated = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading} = useAuth();  
  if (isLoading || !isAuthenticated) {
    return null;
  }
  return <>{children}</>
}