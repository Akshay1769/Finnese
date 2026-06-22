"use client";

import { getUserRole } from "@/services/getUserRole";
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";
 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const router =
    useRouter();

  useEffect(() => {

    const user = getUserRole();

    if (
      user !==
      "admin"
    ) {

      router.push(
        "/dashboard"
      );
    }

  }, [router]);


  return (
    <>
      {children}
    </>
  );
}