"use client";

import { useEffect, useState } from "react";

interface useAuthProps {
  isLoading: boolean;
  isAuthenticated: boolean;
}


export const useAuth = (): useAuthProps => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken')

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }, [])


  return {
    isLoading,
    isAuthenticated
  }
}