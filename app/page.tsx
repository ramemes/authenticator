"use client";
import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function Home() {

  const { setIsAuthenticated } = useAuthContext();

  const onLogOut = () => {
    sessionStorage.removeItem('authToken')
    setIsAuthenticated(false)
  }
  return (
    <div className="flex p-6 h-full">
      <Button onClick={onLogOut}>
        Logout
      </Button>
    </div>
  );
}
