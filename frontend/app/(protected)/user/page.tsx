'use client'

import {api} from "@/services/api"
import {useState, useEffect} from "react"
import Loader from "@/components/pageloader"
import {useRouter} from "next/navigation"

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;

  loginProvider: "local" | "google" | "facebook";

  profileImage?: string;

  isEmailVerified: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export default function userPage() {
    const [userDetails , setuserDetails] = useState<User>();
    const [loading , setloading] = useState(true)
    const router = useRouter();

    const fetchDeatils = async() => {

        try {
        const details = await api.get("/users/me/")

        setuserDetails(details.data.data);

        }
        catch(error){
            alert(error);
        }
        finally{
            setloading(false);
        }

        
    }

useEffect(() => {
  fetchDeatils();
}, [])

if(loading){
    return <Loader/>
}
const  handleLogout = () => {

  localStorage.removeItem("token");

  router.push("/login");
};


return (
  <div className="min-h-screen max-w-5xl mx-auto px-6 py-8">

    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        My Profile
      </h1>

      <p className="text-white/50 mt-2">
        Manage your account information and security settings.
      </p>

    </div>

    <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-8 shadow-xl">

      <div className="flex flex-col items-center mb-10">

        <div className="w-32 h-32 rounded-full bg-amber-400 text-black text-5xl font-black flex items-center justify-center mb-4">

          {userDetails?.firstName?.charAt(0)}
          {userDetails?.lastName?.charAt(0)}

        </div>

        <h2 className="text-3xl font-bold text-white">

          {userDetails?.firstName}
          {" "}
          {userDetails?.lastName}

        </h2>

        <p className="text-white/50 mt-1">
          {userDetails?.email}
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-black border border-white/10 rounded-2xl p-5">

          <p className="text-white/40 text-sm mb-1">
            First Name
          </p>

          <p className="text-white font-semibold">
            {userDetails?.firstName}
          </p>

        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-5">

          <p className="text-white/40 text-sm mb-1">
            Last Name
          </p>

          <p className="text-white font-semibold">
            {userDetails?.lastName}
          </p>

        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-5">

          <p className="text-white/40 text-sm mb-1">
            Email Address
          </p>

          <p className="text-white font-semibold">
            {userDetails?.email}
          </p>

        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-5">

          <p className="text-white/40 text-sm mb-1">
            Verification Status
          </p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              userDetails?.isEmailVerified
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {userDetails?.isEmailVerified
              ? "Verified"
              : "Not Verified"}
          </span>

        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-5">

          <p className="text-white/40 text-sm mb-1">
            Phone Number
          </p>

          <p className="text-white font-semibold">
            {userDetails?.phoneNumber}
          </p>

        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-5">

          <p className="text-white/40 text-sm mb-1">
            Login Provider
          </p>

          <p className="text-white font-semibold capitalize">
            {userDetails?.loginProvider}
          </p>

        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-5 md:col-span-2">

          <p className="text-white/40 text-sm mb-1">
            Member Since
          </p>

          <p className="text-white font-semibold">
            {userDetails?.createdAt
              ? new Date(userDetails.createdAt).toLocaleDateString()
              : "-"}
          </p>

        </div>

      </div>

      <div className="mt-10 flex justify-center">

        <button
          onClick={handleLogout}
          className="bg-red-500/10 border border-red-500/20 text-red-400 px-8 py-3 rounded-xl font-semibold hover:bg-red-500/20 hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>

      </div>

    </div>

  </div>
);
}