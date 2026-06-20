"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"
import Link from "next/link"

interface InvestmentProduct {
  _id: string;

  name: string;

  category:
    | "mutual_fund"
    | "stock"
    | "sip"
    | "insurance";

  riskLevel:
    | "low"
    | "medium"
    | "high";

  expectedReturnMin: number;

  expectedReturnMax: number;

  minimumInvestment: number;

  provider: string;

  description: string;

  isActive: boolean;
}

export default function InvestmentProductsPage() {

  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState<InvestmentProduct[]>([]);

  const fetchProducts = async () => {

    try {

      const response =
        await api.get(
          "/investment-products"
        );

      setProducts(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  if (loading) {
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

 return (
  <div className="min-h-screen max-w-7xl mx-auto px-6 py-8">

    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        Investment Products
      </h1>

      <p className="text-white/50 mt-2">
        Explore curated investment opportunities tailored to different risk profiles.
      </p>

     <Link href="/market">

    <button
      className="
      bg-amber-400
      text-black
      px-5
      py-3
      rounded-2xl
      font-bold
      hover:bg-amber-300
      transition-all
      "
        >
          Explore Live Market
        </button>

      </Link>

    </div>


    {products.length === 0 ? (

      <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-12 text-center">

        <h2 className="text-2xl font-bold text-white">
          No Products Available
        </h2>

        <p className="text-white/50 mt-3">
          Investment products will appear here once available.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-gray-900/80 border border-white/10 rounded-3xl p-6 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10 hover:scale-[1.02] transition-all duration-300"
          >

            <div className="flex items-start justify-between mb-4">

              <h2 className="text-2xl font-bold text-white">
                {product.name}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.riskLevel === "low"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : product.riskLevel === "medium"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {product.riskLevel}
              </span>

            </div>

            <div className="mb-4">

              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm">
                {product.category}
              </span>

            </div>

            <p className="text-white/60 mb-6">
              {product.description}
            </p>

            <div className="space-y-4">

              <div className="bg-black border border-white/10 rounded-2xl p-4">

                <p className="text-white/50 text-sm">
                  Expected Return
                </p>

                <p className="text-xl font-bold text-amber-400">
                  {product.expectedReturnMin}% - {product.expectedReturnMax}%
                </p>

              </div>

              <div className="bg-black border border-white/10 rounded-2xl p-4">

                <p className="text-white/50 text-sm">
                  Minimum Investment
                </p>

                <p className="text-xl font-bold text-white">
                  ₹{product.minimumInvestment.toLocaleString()}
                </p>

              </div>

              <div className="bg-black border border-white/10 rounded-2xl p-4">

                <p className="text-white/50 text-sm">
                  Provider
                </p>

                <p className="text-white font-semibold">
                  {product.provider}
                </p>

              </div>

            </div>

            <div className="mt-6 flex justify-between items-center">

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {product.isActive ? "Active" : "Inactive"}
              </span>

              <div className="flex gap-3">

            <button
              className="
              bg-amber-400
              text-black
              px-4
              py-2
              rounded-xl
              font-semibold
              "
            >
              View Details
            </button>

            <Link href="/market">

              <button
                className="
                border
                border-white/20
                px-4
                py-2
                rounded-xl
                text-white
                hover:border-amber-400
                "
              >
                Live Market
              </button>

            </Link>

          </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}