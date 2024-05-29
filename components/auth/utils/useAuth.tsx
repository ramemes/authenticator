interface useAuthProps {
  isLoading: boolean;
  isAuthenticated: boolean;
}


export const useAuth = (): useAuthProps => {
  return {
    isLoading: true,
    isAuthenticated: false
  }
}