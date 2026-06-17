"use client";

import { useEffect , useState} from "react";
import { useRouter } from "next/navigation";
import LogoAnimation from "@/components/pageloader"

// import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [checkingAuth, setCheckingAuth] =
  useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
    return;
  }

    setCheckingAuth(false);
  }, [router]);

    if (checkingAuth) {
    return <LogoAnimation />;
    }

 return (
  <div className="min-h-screen">

    <Navbar />

    <main className="pt-28 px-6">
      {children}
    </main>

  </div>
);
}