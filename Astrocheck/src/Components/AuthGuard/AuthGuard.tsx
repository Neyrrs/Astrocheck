"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      router.replace("/login");
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
