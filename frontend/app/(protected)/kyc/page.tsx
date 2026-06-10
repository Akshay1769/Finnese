"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function KycPage() {
  const [panNumber, setPanNumber] =
    useState("");

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
  };

  useEffect(() => {
    fetchKyc();
  }, []);

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
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        KYC
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-mist-700 p-8 rounded-2xl shadow-lg shadow-gray-100/70 space-y-5"
      >

        <input
          type="text"
          placeholder="PAN Number"
          value={panNumber}
          onChange={(e) =>
            setPanNumber(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadhaarNumber}
          onChange={(e) =>
            setAadhaarNumber(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Occupation"
          value={occupation}
          onChange={(e) =>
            setOccupation(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-green-500 text-amber-50  hover:text-gray-950 font-medium py-2 px-4 rounded-md transition duration-150"
        >
          Submit KYC
        </button>
      </form>

      {kyc && (
        <div className="border p-4 rounded mt-6">
          <h2 className="text-xl font-bold mb-2">
            KYC Details
          </h2>

          <p>
            PAN:
            {" "}
            {kyc.panNumber}
          </p>

          <p>
            Aadhaar:
            {" "}
            {kyc.aadhaarNumber}
          </p>

          <p>
            Address:
            {" "}
            {kyc.address}
          </p>

          <p>
            Occupation:
            {" "}
            {kyc.occupation}
          </p>

          <p>
            Status:
            {" "}
            {kyc.status}
          </p>
        </div>
      )}
    </div>
  );
}