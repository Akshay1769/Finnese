"use client";

import Link from "next/link";

export default function AdminPage() {

  return (
    <div className="p-10">

      <h1 className="text-3xl w-fit font-bold mb-6 shadow-lg hover:text-shadow-amber-100 text-shadow-xs">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <Link
          href="/admin/products"
          className="border-x-2 border-t-2 p-6 rounded-2xl border-t-amber-200 hover:scale-101 hover:border-b-amber-200 hover:shadow-amber-100 hover:shadow-lg"
        >
          Product Management
        </Link>

        <Link
          href="/admin/blogs"
          className="border-x-2 border-t-2 p-6 rounded-2xl border-t-amber-200 hover:scale-101 hover:border-b-amber-200 hover:shadow-amber-100 hover:shadow-lg"
        >
          Blog Management
        </Link>

        <Link
          href="/admin/notifications"
          className="border-x-2 border-t-2 p-6 rounded-2xl border-t-amber-200 hover:scale-101 hover:border-b-amber-200 hover:shadow-amber-100 hover:shadow-lg"
        >
          Notification Management
        </Link>

        <Link
          href="/admin/bookings"
          className="border-x-2 border-t-2 p-6 rounded-2xl border-t-amber-200 hover:scale-101 hover:border-b-amber-200 hover:shadow-amber-100 hover:shadow-lg"
        >
          Booking Management
        </Link>

      </div>

    </div>
  );
}