"use client";

import Link from "next/link";
import { usePathname , useRouter } from "next/navigation";
import LogoAnimation from "@/components/pageloader";

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

  const handleLogout = () => {

  localStorage.removeItem("token");

  router.push("/login");
};

  return (
    <aside className="w-64 min-h-screen border-r p-4">

        <LogoAnimation/>

      <h1 className="text-2xl font-bold mb-8 ">
        Finnese
      </h1>

      <nav className="space-y-2 bg-blue-200">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded ${
              pathname === link.href
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {link.name}
          </Link>          
        ))}
         <button
                onClick={handleLogout}
                className="w-full text-left p-2 mt-6 border rounded "
                >
                Logout
                </button>
      </nav>
    </aside>
  );
}