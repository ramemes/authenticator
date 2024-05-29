import { ReactNode } from "react";
import { useAuthContext } from "../auth-context";



export const Authenticated: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
    if (!isAuthenticated || isLoading) {
    return null;
  }
  return <>{children}</>
}

export const Unauthenticated: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
    if (isAuthenticated || isLoading) {
    return null;
  }
  return <>{children}</>
}


export const AuthLoading: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
    if (!isLoading) {
    return null;
  }
  return <>{children}</>
}