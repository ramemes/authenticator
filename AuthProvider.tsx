import { ReactElement } from "react";
import { Loading } from "./components/auth/components/loading";
import { Authenticated } from "./components/auth/components/authenticated";
import { Unauthenticated } from "./components/auth/components/unauthenticated";
import { useAuth } from "./components/auth/utils/useAuth";

interface AuthProviderProps {
  children: React.ReactNode
}



export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  return (
    <>
    {isAuthenticated ? 
      <Authenticated>
        {children}
      </Authenticated>
      :
      <Unauthenticated>
        <Loading/>
      </Unauthenticated>
    }
    </>
  )
}