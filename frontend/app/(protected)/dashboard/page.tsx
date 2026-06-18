"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Link from "next/link";
import LogoAnimation from "@/components/pageloader"
import {
  User,
  Wallet,
  Bell,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Target,
  Activity,
  Lightbulb,
} from "lucide-react";

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


    const healthScore = 0;

    const recommendations = [
      "Complete KYC verification",
      "Create your first portfolio",
      "Book an advisor session",
      "Take risk assessment",
    ];

    const activities = [
      "Account Created",
      "Portfolio Initialized",
      "Dashboard Accessed",
    ];

    const assetAllocation = [
      { name: "Stocks", value: 0 },
      { name: "Mutual Funds", value: 0 },
      { name: "FDs", value: 0 },
      { name: "Cash", value: 0 },
    ];




  return (
  <div className="min-h-screen w-full bg-linear-to-br from-black via-gray-950 to-black p-8">
    <div
      className="
        fixed
        top-20
        right-20

        w-72
        h-72

        bg-amber-400/10

        blur-3xl

        rounded-full

        pointer-events-none
      "
/>

    {/* Header */}
    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        Welcome Back 👋
      </h1>

      <p className="text-white/50 mt-2">
        Here's your financial overview today.
      </p>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <Link href="/portfolio">
      <div className="p-6
                    rounded-2xl
                    bg-gray-900/80
                    border border-white/10

                    hover:border-amber-400
                    hover:shadow-lg
                    hover:shadow-amber-400/20
                    hover:scale-105

                    transition-all
                    duration-300">

        <Wallet className="w-8 h-8 text-amber-400 mb-4" />

        <h3 className="text-white/60">
          Portfolios
        </h3>

        <p className="text-3xl font-bold text-white">
          {stats?.portfolios ?? 0}
        </p>

      </div>
      </Link>
      <Link href="/notifications">
      <div className="p-6
                    rounded-2xl
                    bg-gray-900/80
                    border border-white/10

                    hover:border-amber-400
                    hover:shadow-lg
                    hover:shadow-amber-400/20
                    hover:scale-105

                    transition-all
                    duration-300">
                      
        <Bell className="w-8 h-8 text-amber-400 mb-4" />

        <h3 className="text-white/60">
          Notifications
        </h3>
        
        <p className="text-3xl font-bold text-white">
          {stats?.notifications ?? 0}
        </p>
        
        

      </div>
      </Link>
      
      <Link href="/advisorBookings">
      <div className="p-6
                    rounded-2xl
                    bg-gray-900/80
                    border border-white/10

                    hover:border-amber-400
                    hover:shadow-lg
                    hover:shadow-amber-400/20
                    hover:scale-105

                    transition-all
                    duration-300">

        <Calendar className="w-8 h-8 text-amber-400 mb-4" />

        <h3 className="text-white/60">
          Bookings
        </h3>

        <p className="text-3xl font-bold text-white">
          {stats?.bookings ?? 0}
        </p>

      </div>
    </Link>

    <Link href="/kyc">
      <div className="p-6
                      rounded-2xl
                      bg-gray-900/80
                      border border-white/10

                      hover:border-amber-400
                      hover:shadow-lg
                      hover:shadow-amber-400/20
                      hover:scale-105

                      transition-all
                      duration-300">

        <ShieldCheck className="w-8 h-8 text-amber-400 mb-4" />

        <h3 className="text-white/60">
          KYC Status
        </h3>

        <p className="text-xl font-bold text-white">
          {stats?.kycStatus ?? "Pending"}
        </p>

      </div>
      </Link>

    </div>

    {/* Financial Health Score */}

    <div className="bg-linear-to-r from-amber-500/10 to-amber-300/5">

      <div className="flex items-center gap-3 mb-4">

        <TrendingUp className="text-amber-400" />

        <h2 className="text-xl font-bold text-white">
          Financial Health Score
        </h2>

      </div>

      <p className="text-5xl font-black text-white">
        {healthScore}/100
      </p>

      <p className="text-white/50 mt-3">
        Complete your profile and start investing to improve your score.
      </p>

    </div>

    {/* Charts Section */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      {/* Asset Allocation */}

      <div className="p-6 rounded-2xl bg-gray-900/80 border border-white/10">

        <h2 className="text-xl font-bold text-white mb-4">
          Asset Allocation
        </h2>

        <div className="space-y-4">

          {assetAllocation.map((asset) => (

            <div key={asset.name}>

            <div className="flex justify-between text-white/70 mb-1">

              <span>{asset.name}</span>

              <span>{asset.value}%</span>

            </div>

            <div className="w-full h-2 bg-white/10 rounded-full">

              <div
                className="h-full bg-amber-400 rounded-full"
                style={{
                  width: `${asset.value}%`
                }}
              />

            </div>


              <span>{asset.name}</span>
              <span>{asset.value}%</span>
            </div>

          ))}

        </div>

      </div>

      {/* Monthly Trend */}

      <div className="p-6 rounded-2xl bg-gray-900/80 border border-white/10">

        <h2 className="text-xl font-bold text-white mb-4">
          Monthly Investment Trend
        </h2>

        <div className="h-48 flex items-center justify-center text-white/30">

         <div className="h-48 flex items-end justify-between px-4">

              {[20,40,30,60,50,80].map((h,i)=>(
                <div
                  key={i}
                  className="w-8 bg-amber-400 rounded-t"
                  style={{
                    height:`${h}%`
                  }}
                />
              ))}

          </div>

        </div>

      </div>

    </div>

    {/* Goal Tracker */}

    <div className="mb-8 p-6 rounded-2xl bg-gray-900/80 border border-white/10">

      <div className="flex items-center gap-3 mb-4">

        <Target className="text-amber-400" />

        <h2 className="text-xl font-bold text-white">
          Emergency Fund Goal
        </h2>

      </div>

      <p className="text-white/60 mb-4">
        ₹0 / ₹100,000
      </p>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

        <div
          className="h-full bg-amber-400"
          style={{ width: "35%" }}
        />

      </div>

    </div>

    {/* Recommendations */}

    <div className="mb-8 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">

      <div className="flex items-center gap-3 mb-4">

        <Lightbulb className="text-amber-400" />

        <h2 className="text-xl font-bold text-white">
          Recommendations
        </h2>

      </div>

      <div className="space-y-3">

        {recommendations.map((item) => (

          <div
            key={item}
            className="
              flex
              items-center
              gap-3

              text-white/80

              p-3

              rounded-lg

              hover:bg-white/5

              transition-all
            "
          >
            • {item}
          </div>

        ))}

      </div>

    </div>

    {/* Recent Activity */}

    <div className="p-6 rounded-2xl bg-gray-900/80 border border-white/10">

      <div className="
                flex
                items-center
                gap-3
                py-3
                border-b
                border-white/5
                ">

        <Activity className="text-blue-400" />

        <h2 className="text-xl font-bold text-white">
          Recent Activity
        </h2>

      </div>

      {activities.length === 0 ? (

        <p className="text-white/40">
          No activity available yet.
        </p>

      ) : (

        activities.map((activity) => (
          <div key={activity}>
            {activity}
          </div>
        ))

      )}

    </div>

  </div>
)
};