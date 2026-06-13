"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

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
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Investment Products
      </h1>

      <div className="space-y-4">

        {products.map(
          (product) => (

            <div
              key={product._id}
              className="border p-4 rounded"
            >

              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p>
                Category:
                {" "}
                {product.category}
              </p>

             <p>
                Risk Level:
                {" "}

                <span
                    className={
                    product.riskLevel === "low"
                        ? "text-green-600 font-bold"
                        : product.riskLevel === "medium"
                        ? "text-yellow-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                >
                    {product.riskLevel}
                </span>
                </p>

              <p>
                Expected Return:
                {" "}
                {product.expectedReturnMin}
                %
                -
                {product.expectedReturnMax}
                %
              </p>

              <p>
                Minimum Investment:
                {" "}
                ₹
                {product.minimumInvestment}
              </p>

              <p>
                Provider:
                {" "}
                {product.provider}
              </p>

              <p>
                Description:
                {" "}
                {product.description}
              </p>

              <p>
                Status:
                {" "}
                {
                  product.isActive
                    ? "Active"
                    : "Inactive"
                }
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}