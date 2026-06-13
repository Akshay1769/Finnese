"use client";

import { useEffect , useState} from "react";
import { useRouter } from "next/navigation";
import LogoAnimation from "@/components/pageloader"

import Sidebar from "../../components/Sidebar";
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

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.replace("/login");
    }

    else{
    setCheckingAuth(false);
    }

  }, [router]);

    if (checkingAuth) {
    return <LogoAnimation />;
    }

  return (
    <div className=" right-20" >
        {/* <div className = "bg-blue-50 text-amber-400" >
      <Sidebar />
      </div> */}

      <div className="flex-1 m-px right-56left-auto max-w ">
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