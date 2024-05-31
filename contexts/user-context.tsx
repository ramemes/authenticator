"use client";

import { ReactNode, createContext, useContext, useState } from 'react';

type loggedInUser = {
    username: string;
}

interface UserContextProps {
  loggedInUser: {
    username: string;
  };
  setLoggedInUser: (loggedInUser: loggedInUser) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};

interface UserProvider {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProvider) => {
  const [loggedInUser, setLoggedInUser] = useState<loggedInUser>({
    username: "",
  })

  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
    </UserContext.Provider>
  )
}