"use client";

import Link from "next/link";
import { usePathname , useRouter } from "next/navigation";
import Loader from "@/components/pageloader";

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
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const  handleLogout = () => {

  localStorage.removeItem("token");

  router.push("/login");
};

  return (
    <aside className="w-64 min-h-screen border-r p-4">
        <Link
        href="/dashboard"
        className="flex flex-col hover:opacity-800 transition"
      >
      <h1 className=" flex text-2xl font-bold mb-8 ">
        Finnese
      </h1>
      </Link>

      <nav className="space-y-2 bg-blue-100">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded ${
              pathname === link.href
                ? "bg-black text-white"
                : "hover:bg-yellow-400 hover:text-black"
            }`}
          >
            {link.name}
          </Link>          
        ))}
         
      </nav>
    </aside>
  );
}