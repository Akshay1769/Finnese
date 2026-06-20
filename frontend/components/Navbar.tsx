"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle2Icon } from "lucide-react";
import { motion } from "framer-motion";
import {useState,useEffect} from "react"
import { getUserRole } from "@/services/getUserRole";

export default function Navbar() {

    const pathname = usePathname();

  const [role, setRole] =
      useState<string | null>(null);

    useEffect(() => {
      setRole(getUserRole());
    }, []);

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "KYC",
    href: "/kyc",
  },
  {
    name: "Risk Assessment",
    href: "/riskAssessment",
  },
  {
    name: "Investment Products",
    href: "/InvestmentProducts",
  },
  {
    name: "Notifications",
    href: "/notifications",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Advisor Bookings",
    href: "/AdvisorBookings",
  },
  {
    name: "Chat",
    href: "/chats",
  },
    ...(role === "admin"
      ? [
        {
          name: "admin",
          href: "/admin"
        },
      ]
      : 
      []),
];

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-between w-[95%] max-w-7xl px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 z-50"
    >
      <Link
        href="/dashboard"
        className="
          flex
          items-center
          shrink-0
        "
      >
        <h1
          className="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors duration-300"
        >
          Finnese
        </h1>
      </Link>

      <div
        className=" lg:flex items-center gap-1"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
           className= {`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105
            {
                  pathname === link.href
                  ? "text-black"
                  : "text-white hover:text-amber-300"
              }
            `}
          >
            {pathname === link.href && (
              <motion.div
                layoutId="active-pill"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className=" absolute inset-0 bg-amber-300 rounded-full -z-10 "
              />
            )}

            <span className="relative z-10">
              {link.name}
            </span>
          </Link>
        ))}
      </div>

      {/* User Profile */}

      <Link
        href="/user"
        className="
          p-2

          rounded-full

          text-white

          hover:bg-white/10
          hover:text-amber-300

          transition-all
          duration-300

          hover:scale-110
        "
      >
        <UserCircle2Icon size={24} />
      </Link>
    </header>
  );
}