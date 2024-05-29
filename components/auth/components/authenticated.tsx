import { ReactNode } from "react";
import { useAuth } from "../utils/useAuth"

export const Authenticated = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated} = useAuth();  
  if (isLoading || !isAuthenticated) {
    return null;
  }
  return <>{children}</>
}