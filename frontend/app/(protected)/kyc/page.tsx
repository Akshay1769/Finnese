"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

export default function KycPage() {
  const [panNumber, setPanNumber] =
    useState("");
  const [loading, setloading] = useState(true);

  const [
    aadhaarNumber,
    setAadhaarNumber,
  ] = useState("");

  const [address, setAddress] =
    useState("");

  const [
    occupation,
    setOccupation,
  ] = useState("");

  const [kyc, setKyc] =
    useState<any>(null);

  const fetchKyc = async () => {
    try {
      const response =
        await api.get("/kyc/me");

      setKyc(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
    finally{
      setloading(false);
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);


  if (loading) {
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }



  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await api.post("kyc/", {
        panNumber,
        aadhaarNumber,
        address,
        occupation,
      });

      fetchKyc();
    } catch (error) {
      console.log(error);
    }
  };

 return (
  <div className="min-h-screen max-w-6xl mx-auto px-6 py-8">

    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        KYC Verification
      </h1>

      <p className="text-white/50 mt-2">
        Complete your Know Your Customer verification to unlock investment features.
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/80 border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto space-y-5 shadow-xl mb-10"
    >

      <input
        type="text"
        placeholder="PAN Number"
        value={panNumber}
        onChange={(e) => setPanNumber(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
      />

      <input
        type="text"
        placeholder="Aadhaar Number"
        value={aadhaarNumber}
        onChange={(e) => setAadhaarNumber(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
      />

      <input
        type="text"
        placeholder="Occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
      />

      <button
        type="submit"
        className="w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300"
      >
        Submit KYC
      </button>

    </form>

    {!kyc ? (

      <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-12 text-center">

        <h2 className="text-2xl font-bold text-white">
          No KYC Record Found
        </h2>

        <p className="text-white/50 mt-3">
          Complete the KYC form above to verify your identity.
        </p>

      </div>

    ) : (

      <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-bold text-white">
            KYC Details
          </h2>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              kyc.status === "APPROVED"
                ? "bg-emerald-500/10 text-emerald-400"
                : kyc.status === "PENDING"
                ? "bg-amber-500/10 text-amber-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {kyc.status}
          </span>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-black border border-white/10 rounded-2xl p-4">
            <p className="text-white/50 text-sm mb-1">
              PAN Number
            </p>
            <p className="text-white font-semibold">
              {kyc.panNumber}
            </p>
          </div>

          <div className="bg-black border border-white/10 rounded-2xl p-4">
            <p className="text-white/50 text-sm mb-1">
              Aadhaar Number
            </p>
            <p className="text-white font-semibold">
              {kyc.aadhaarNumber}
            </p>
          </div>

          <div className="bg-black border border-white/10 rounded-2xl p-4 md:col-span-2">
            <p className="text-white/50 text-sm mb-1">
              Address
            </p>
            <p className="text-white font-semibold">
              {kyc.address}
            </p>
          </div>

          <div className="bg-black border border-white/10 rounded-2xl p-4 md:col-span-2">
            <p className="text-white/50 text-sm mb-1">
              Occupation
            </p>
            <p className="text-white font-semibold">
              {kyc.occupation}
            </p>
          </div>

        </div>

      </div>

    )}

  </div>
);
}