"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

interface DashboardStats {
  name : string;
  portfolios: number;
  notifications: number;
  bookings: number;
  kycStatus: string;
}

export default function DashboardPage() {

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response =
          await api.get(
            "/dashboard/stats"
          );

        setStats(
          response.data.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchStats();

  }, []);

  if (loading) {
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

  return (

    <div className="p-10">    

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-600 md:text-5xl lg:text-4xl dark:text-black p-4">
        Dashboard
          
      </h1>

      <div className="grid grid-cols-2 gap-4">
      
        <div className="border p-4 rounded hover:border-t-4 hover:bg-mist-200  hover:border-amber-300 hover:">
          <h2>User</h2>
          <p>{stats?.name}</p>
        </div>

        
        <div className="border p-4 rounded hover:border-t-4 hover:bg-mist-200 hover:border-amber-300 hover:">
          <h2>Portfolios</h2>
         
          <p>{stats?.portfolios}</p>
        </div>
       

        <div className="border p-4 rounded hover:border-t-4 hover:bg-mist-200  hover:border-amber-300 hover:">
          <h2>Notifications</h2>
          <p>{stats?.notifications}</p>
        </div>

        <div className="border p-4 rounded hover:border-t-4 hover:bg-mist-200  hover:border-amber-300 hover:">
          <h2>Bookings</h2>
          <p>{stats?.bookings}</p>
        </div>

        <div className="border p-4 rounded hover:border-t-4 hover:bg-mist-200 hover:border-amber-300 hover:">
          <h2>KYC Status</h2>
          <p>{stats?.kycStatus}</p>
        </div>

      </div>

    </div>
  );
}