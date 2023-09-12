"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@lib/firebase-config";
import UserStore from "@store/user/user.store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = UserStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  return <div>{children}</div>;
};

export default AuthProvider;
