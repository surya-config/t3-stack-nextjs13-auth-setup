"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "src/store/auth";

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { user } = useAuthStore();

    useEffect(() => {
      if (!user) {
        // Redirect to the login page if not logged in
        router.push("/login");
      }

      console.log(router?.pathname?.includes("/login"));

      // if (
      //   user?.id &&
      //   (router?.pathname?.includes("/login") ||
      //     router.pathname?.includes("/register"))
      // ) {
      //   router.push("/");
      // }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
