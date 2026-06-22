"use client";

import { useState } from "react";
import { api } from "@/services/api";
import Link from "next/link";

interface Scheme {
  schemeCode: number;
  schemeName: string;
}

export default function MarketPage() {

  const [query, setQuery] =
    useState("");

  const [schemes, setSchemes] =
    useState<Scheme[]>([]);

  const [loading, setLoading] =
    useState(false);

  const searchSchemes = async () => {

    try {

      setLoading(true);

      const response =
        await api.get(
          `/market/search?q=${query}`
        );

      setSchemes(
        response.data.data
      );

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen p-8">

      <h1 className="text-4xl mb-8">
        Market Search
      </h1>

      <div className="flex gap-4 mb-8">

        <input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          className="border p-3 w-full rounded"
          placeholder="Search funds..."
        />

        <button
          onClick={searchSchemes}
          className="bg-amber-400 px-6 rounded"
        >
          Search
        </button>

      </div>

      {

        loading ?

          <h1>Loading...</h1>

          :

          <div className="space-y-4">

            {

              schemes.map(

                (scheme) => (

                  <Link
                    key={scheme.schemeCode}
                    href={`/market/${scheme.schemeCode}`}
                  >

                    <div
                     className="bg-gray-900/80 border grid-cols-3 border-white/10 rounded-3xl p-6 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10 hover:scale-[1.02] transition-all duration-300"
                    >

                      <h2>

                        {
                          scheme.schemeName
                        }

                      </h2>

                    </div>

                  </Link>

                )

              )

            }

          </div>

      }

    </div>

  );

}