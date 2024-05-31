"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { ConvexProvider, ConvexReactClient } from "convex/react";


interface ConvexClientProviderProps {
  children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexProvider client={convex}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ConvexProvider>
  );
}
