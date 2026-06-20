"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoAnimation from "@/components/pageloader"
import { getUserRole } from "@/services/getUserRole";
import { api } from "../../services/api";
import   Link  from "next/link";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );


      alert(
        "Login Successful"
      );

      if(getUserRole() === "admin"){
        router.push(
          "/admin"
        )
      }
      else{
      router.push(
        "/dashboard"
      );
    }
  

    } catch (error: any) {

      alert(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleLogin} className="w-100 border p-6 rounded-lg space-y-4">

        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input type="email" placeholder="Email" value={email} 
        onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
           className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
        />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
           className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
        />

        <button type="submit" disabled={loading} className="w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300">
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>
          <p>
        New user 👉<Link className="text-blue-400" href="/register"> Register here</Link>
        </p>
      </form>

    </div>
  );
}