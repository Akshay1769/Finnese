"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoAnimation from "@/components/pageloader"

import { api } from "../../services/api";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
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

      router.push(
        "/dashboard"
      );

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

      <form onSubmit={handleLogin} className="w-[400px] border p-6 rounded-lg space-y-4">

        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input type="email" placeholder="Email" value={email} 
        onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-2"
        />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-2"
        />

        <button type="submit" disabled={loading} className="w-full border p-2">
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>

      </form>

    </div>
  );
}