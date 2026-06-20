"use client";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import LogoAnimation from "@/components/pageloader";

interface Props {
  params: Promise<{
    schemeCode: string;
  }>;
}

interface Meta {
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
}

interface NavData {
  date: string;
  nav: string;
}

export default function SchemePage({ params }: Props) {
  const [meta, setMeta] =
    useState<Meta | null>(null);

  const [navData, setNavData] =
    useState<NavData[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const { schemeCode } =
          await params;

        const response =
          await api.get(
            `/market/scheme/${schemeCode}`
          );

        setMeta(
          response.data.data.meta
        );

        setNavData(
          response.data.data.data.slice(
            0,
            10
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white">
          No data found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-3xl font-bold text-white mb-8">
        {meta.scheme_name}
      </h1>

      <div className="space-y-4 mb-10">

        <div className="border p-4 rounded-xl">
          <p className="text-white">
            <span className="font-bold">
              Fund House:
            </span>{" "}
            {meta.fund_house}
          </p>
        </div>

        <div className="border p-4 rounded-xl">
          <p className="text-white">
            <span className="font-bold">
              Category:
            </span>{" "}
            {meta.scheme_category}
          </p>
        </div>

        <div className="border p-4 rounded-xl">
          <p className="text-white">
            <span className="font-bold">
              Scheme Type:
            </span>{" "}
            {meta.scheme_type}
          </p>
        </div>

      </div>

      <h2 className="text-2xl text-white mb-6">
        Recent NAV History
      </h2>

      <div className="space-y-4">

        {navData.map((nav) => (
          <div
            key={nav.date}
            className="border p-4 rounded-xl"
          >
            <p className="text-white">
              Date: {nav.date}
            </p>

            <p className="text-amber-400 font-bold">
              ₹{nav.nav}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}