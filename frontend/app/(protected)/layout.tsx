"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");
    }

  }, [router]);

  return (
    <div className="flex" >
        <div className = "bg-blue-200 text-amber-400" >
      <Sidebar />
      </div>

      <div className="flex-1">
        <div className="bg-blue-200 text-black">
        <Navbar />
        </div>

        <main>
          {children}
        </main>

      </div>

    </div>
  );
}