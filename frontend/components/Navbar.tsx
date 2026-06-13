"use client";

import { usePathname ,useRouter } from "next/navigation";
import  Link from   "next/link";
import {UserCircle2Icon} from "lucide-react"


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



export default function Navbar() {

  const pathname = usePathname();

  return (
    <header className="border-b p-4 flex justify-between items-center sticky">

      <Link
        href="/dashboard"
        className="flex flex-col hover:text-amber-500 hover:opacity-800 transition"
      >
      <h1 className=" flex text-2xl font-bold mb-8 hover:text-amber-400 hover:opacity-800 ">
        Finnese
      </h1>
      </Link>

       <div className="flex bg-transparent ">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex p-2  border-b-amber-400 border rounded active:scale-95 ${
              pathname === link.href
                ? "bg-black text-white"
                : "hover:bg-yellow-400 hover:text-black"
            }`}
          >
            {link.name}
          </Link>          
        ))}
         
      </div>

      <div >
        <Link href="/user">
        <div>
            <h1>
            <UserCircle2Icon/>
            </h1>
        </div>
       </Link> 
      </div>
    

    </header>
  );
}