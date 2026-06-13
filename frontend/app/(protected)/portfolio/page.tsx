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
    <div className="p-4 bg-blue-50" >
      <h1 className="text-3xl font-bold mb-6">
        Portfolio
      </h1>

      <form
        onSubmit={
          handleCreatePortfolio
        }
        className="max-w-md mx-auto bg-mist-300 p-8 rounded-2xl shadow-lg shadow-gray-100/70 space-y-4"
      >
        <input
          type="string"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />

        <select value = {riskLevel}
        onChange = {(e) =>
            setRiskLevel(
              e.target.value)
           }
           className="border p-2 w-full "
        >
        
        <option value = "">Select Risk Level</option>
        <option value = "low">low</option>
        <option value = "medium">medium</option>
        <option value = "high">high</option>
        
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
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-green-500 text-amber-50  hover:text-gray-950 font-medium py-2 px-4 rounded-md hover:active:scale-95"
        >
          Create Portfolio
        </button>
      </form>

  <div className="space-y-4">

  {portfolios.length === 0 ? (

    <div className="border rounded-lg p-6 text-center mt-6">

      <h2 className="text-xl font-semibold">
        No Portfolios Found
      </h2>

      <p className="text-gray-500 mt-2">
        Create your first investment portfolio.
      </p>

    </div>

  ) : (

    portfolios.map((portfolio) => (

      <div
        key={portfolio._id}
        className="border p-4 rounded"
      >
        <p>
          Name: {portfolio.name}
        </p>

        <p>
          Description: {portfolio.description}
        </p>

        <p>
          Risk: {portfolio.riskLevel}
        </p>

        <p>
          Target Amount: ₹ {portfolio.targetAmount}
        </p>

        <p>
          Current Amount: ₹ {portfolio.currentAmount}
        </p>

        <p>
          Status:{" "}
          {portfolio.isActive
            ? "Active"
            : "Inactive"}
        </p>

      </div>

        ))

      )}

        </div>
      </div>
  );
}