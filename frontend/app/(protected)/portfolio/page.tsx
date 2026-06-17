"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Loader from "@/components/pageloader"

interface Portfolio {
  _id: string;
  name : string;
  description: string;
  targetAmount: number;
  currentAmount : number;
  riskLevel: string;
  isActive: boolean;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] =
    useState<Portfolio[]>([]);

  const [name, setName] =
  useState("");

  const [description, setDescription] =
  useState("");

  const [loading, setLoading] =
    useState(true);

  const [riskLevel, setRiskLevel] =
    useState("");
 
  const [targetAmount, setTargetAmount] =
  useState("");

  const [currentAmount , setcurrentAmount] =
  useState("");

  const fetchPortfolios = async () => {
    try {
      const response =
        await api.get("/portfolios");

      setPortfolios(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);







  const handleCreatePortfolio = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await api.post("/portfolios", {
            name,
            description,
            riskLevel,
            targetAmount:
                Number(targetAmount),
            currentAmount:
                Number(currentAmount),
            });

      setName("");
      setDescription("");
      setRiskLevel("");
      setTargetAmount("");
      setcurrentAmount("");

      fetchPortfolios();
    } catch (error: any) {

        console.log(
            error.response?.data
        );

        alert(
            JSON.stringify(
            error.response?.data
            )
        );
        }
  };

  if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
    )
  }

  return (
  <div
    className="
      min-h-screen
      max-w-7xl
      mx-auto
      px-6
      py-8
      relative
    "
  >

    {/* Background Glow */}

    <div
      className="
        fixed
        top-40
        right-40

        w-96
        h-96

        bg-amber-400/10

        rounded-full

        blur-3xl

        pointer-events-none
      "
    />

    {/* Header */}

    <div className="mb-10">

      <h1
        className="
          text-4xl
          font-black
          text-white
        "
      >
        Portfolio Management
      </h1>

      <p
        className="
          text-white/50
          mt-2
        "
      >
        Create and manage your investment portfolios.
      </p>

    </div>

    {/* Create Portfolio Form */}

    <form
      onSubmit={handleCreatePortfolio}
      className="
        w-full

        bg-gray-900/80

        border
        border-white/10

        rounded-3xl

        p-8

        grid
        grid-cols-1
        md:grid-cols-2

        gap-4

        text-white

        shadow-xl

        mb-10
      "
    >

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="
          w-full
          p-3

          bg-black

          border
          border-white/10

          rounded-xl

          text-white

          focus:outline-none
          focus:border-amber-400

          transition-all
        "
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="
          w-full
          p-3

          bg-black

          border
          border-white/10

          rounded-xl

          text-white

          focus:outline-none
          focus:border-amber-400

          transition-all
        "
      />

      <select
        value={riskLevel}
        onChange={(e) =>
          setRiskLevel(
            e.target.value
          )
        }
        className="
          w-full
          p-3

          bg-black

          border
          border-white/10

          rounded-xl

          text-white

          focus:outline-none
          focus:border-amber-400

          transition-all
        "
      >
        <option value="">
          Select Risk Level
        </option>

        <option value="low">
          Low
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="high">
          High
        </option>
      </select>

      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) =>
          setTargetAmount(
            e.target.value
          )
        }
        className="
          w-full
          p-3

          bg-black

          border
          border-white/10

          rounded-xl

          text-white

          focus:outline-none
          focus:border-amber-400

          transition-all
        "
      />

      <input
        type="number"
        placeholder="Current Amount"
        value={currentAmount}
        onChange={(e) =>
          setcurrentAmount(
            e.target.value
          )
        }
        className="
          w-full

          p-3

          bg-black

          border
          border-white/10

          rounded-xl

          text-white

          md:col-span-2

          focus:outline-none
          focus:border-amber-400

          transition-all
        "
      />

      <button
        type="submit"
        className="
          md:col-span-2

          bg-amber-400

          text-black

          font-bold

          py-3

          rounded-xl

          hover:bg-amber-300

          hover:scale-[1.02]

          transition-all
          duration-300
        "
      >
        Create Portfolio
      </button>

    </form>

    {/* Portfolio List */}

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      "
    >

      {portfolios.length === 0 ? (

        <div
          className="
            md:col-span-2

            bg-gray-900/80

            border
            border-white/10

            rounded-3xl

            p-12

            text-center
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            No Portfolios Found
          </h2>

          <p
            className="
              text-white/50
              mt-3
            "
          >
            Create your first investment portfolio.
          </p>

        </div>

      ) : (

        portfolios.map((portfolio) => (

          <div
            key={portfolio._id}
            className="
              bg-gray-900/80

              border
              border-white/10

              rounded-3xl

              p-6

              hover:border-amber-400

              hover:shadow-lg
              hover:shadow-amber-400/20

              hover:scale-[1.02]

              transition-all
              duration-300
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-2
              "
            >
              {portfolio.name}
            </h2>

            <p
              className="
                text-white/60
                mb-5
              "
            >
              {portfolio.description}
            </p>

            <div className="mb-4">

              <span
                className={`
                  px-3
                  py-1

                  rounded-full

                  text-sm

                  ${
                    portfolio.riskLevel === "high"
                      ? "bg-red-500/10 text-red-400"
                      : portfolio.riskLevel === "medium"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }
                `}
              >
                {portfolio.riskLevel}
              </span>

            </div>

            <div className="mb-4">

              <div
                className="
                  flex
                  justify-between

                  text-white/70

                  mb-2
                "
              >
                <span>
                  Progress
                </span>

                <span>
                  ₹{portfolio.currentAmount}
                  {" / "}
                  ₹{portfolio.targetAmount}
                </span>
              </div>

              <div
                className="
                  w-full
                  h-2

                  bg-white/10

                  rounded-full
                "
              >

                <div
                  className="
                    h-full

                    bg-amber-400

                    rounded-full
                  "
                  style={{
                    width: `${Math.min(
                      (portfolio.currentAmount /
                        portfolio.targetAmount) *
                        100,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-5">

              <span
                className={`
                  inline-flex

                  px-3
                  py-1

                  rounded-full

                  text-sm

                  ${
                    portfolio.isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }
                `}
              >
                {portfolio.isActive
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

          </div>

        ))

      )}

    </div>

  </div>
);
}