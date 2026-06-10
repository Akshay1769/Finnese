"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  return (
    <header className="border-b p-4 flex justify-between items-center">

      <h2 className="text-xl font-semibold">
        {pathname.replace("/", "") || "Dashboard"}
      </h2>

      <div>
        Logged In User
      </div>

    </header>
  );
}