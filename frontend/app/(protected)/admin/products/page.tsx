"use client";

import { useEffect, useState } from "react";
import { api } from "../../../../services/api";

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

export default function AdminProductsPage() {

  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState<InvestmentProduct[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState<
      "mutual_fund" |
      "stock" |
      "sip" |
      "insurance"
    >("mutual_fund");

  const [riskLevel, setRiskLevel] =
    useState<
      "low" |
      "medium" |
      "high"
    >("low");

  const [
    expectedReturnMin,
    setExpectedReturnMin
  ] = useState("");

  const [
    expectedReturnMax,
    setExpectedReturnMax
  ] = useState("");

  const [
    minimumInvestment,
    setMinimumInvestment
  ] = useState("");

  const [provider, setProvider] =
    useState("");

  const [
    description,
    setDescription
  ] = useState("");

  const fetchProducts =
    async () => {

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

  const resetForm = () => {

    setEditingId(null);

    setName("");

    setCategory(
      "mutual_fund"
    );

    setRiskLevel(
      "low"
    );

    setExpectedReturnMin("");

    setExpectedReturnMax("");

    setMinimumInvestment("");

    setProvider("");

    setDescription("");
  };

  const handleSubmit =
    async (
      e: React.SyntheticEvent<HTMLFormElement>
    ) => {

      e.preventDefault();

      const payload = {

        name,

        category,

        riskLevel,

        expectedReturnMin:
          Number(
            expectedReturnMin
          ),

        expectedReturnMax:
          Number(
            expectedReturnMax
          ),

        minimumInvestment:
          Number(
            minimumInvestment
          ),

        provider,

        description,
      };

      try {

        if (
          editingId
        ) {

          await api.put(
            `/investment-products/${editingId}`,
            payload
          );

        } else {

          await api.post(
            "/investment-products",
            payload
          );
        }

        resetForm();

        await fetchProducts();

      } catch (
        error: any
      ) {

        console.log(
          error
        );

        alert(
          JSON.stringify(
            error.response
              ?.data
          )
        );
      }
    };

  const handleEdit =
    (
      product:
        InvestmentProduct
    ) => {

      setEditingId(
        product._id
      );

      setName(
        product.name
      );

      setCategory(
        product.category
      );

      setRiskLevel(
        product.riskLevel
      );

      setExpectedReturnMin(
        String(
          product.expectedReturnMin
        )
      );

      setExpectedReturnMax(
        String(
          product.expectedReturnMax
        )
      );

      setMinimumInvestment(
        String(
          product.minimumInvestment
        )
      );

      setProvider(
        product.provider
      );

      setDescription(
        product.description
      );
    };

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmed =
        window.confirm(
          "Delete product?"
        );

      if (
        !confirmed
      ) {
        return;
      }

      try {

        await api.delete(
          `/investment-products/${id}`
        );

        await fetchProducts();

      } catch (
        error
      ) {

        console.log(
          error
        );
      }
    };

  const toggleStatus =
    async (
      id: string
    ) => {

      try {

        await api.patch(
          `/investment-products/${id}/status`
        );

        window.alert("status changed")

        await fetchProducts();

      } catch (
        error
      ) {

        console.log(
          error
        );
      }
    };

  if (
    loading
  ) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Product Management
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="
          border
          p-4
          rounded
          mb-8
          space-y-3
        "
      >

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <select
          value={
            category
          }
          onChange={(e) =>
            setCategory(
              e.target
                .value as any
            )
          }
          className="border p-2 w-full"
        >
          <option value="mutual_fund">
            Mutual Fund
          </option>

          <option value="stock">
            Stock
          </option>

          <option value="sip">
            SIP
          </option>

          <option value="insurance">
            Insurance
          </option>
        </select>

        <select
          value={
            riskLevel
          }
          onChange={(e) =>
            setRiskLevel(
              e.target
                .value as any
            )
          }
          className="border p-2 w-full"
        >
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
          placeholder="Expected Return Min"
          value={
            expectedReturnMin
          }
          onChange={(e) =>
            setExpectedReturnMin(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Expected Return Max"
          value={
            expectedReturnMax
          }
          onChange={(e) =>
            setExpectedReturnMax(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Minimum Investment"
          value={
            minimumInvestment
          }
          onChange={(e) =>
            setMinimumInvestment(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Provider"
          value={
            provider
          }
          onChange={(e) =>
            setProvider(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <div className="flex gap-3">

          <button
            type="submit"
            className="
              border
              px-4
              py-2
            "
          >
            {
              editingId
                ? "Update Product"
                : "Create Product"
            }
          </button>

          {
            editingId && (
              <button
                type="button"
                onClick={
                  resetForm
                }
                className="
                  border
                  px-4
                  py-2
                "
              >
                Cancel
              </button>
            )
          }

        </div>

      </form>

      <div className="w-fit flex ml-3">

        {
          products.map(
            (
              product
            ) => (

              <div
                key={
                  product._id
                }
                className="
                  border
                  transform-stroke
                  p-4
                  ml-2
                  rounded-2xl
                  shadow-emerald-50
                  hover:shadow-lg
                  hover:scale-101
                  border-orange-200
                  backdrop-blur-2xl
                "
              >

                <h2 className="text-xl font-bold text-amber-200">
                  {
                    product.name
                  }
                </h2>

                <p>
                  Category:
                  {" "}
                  {
                    product.category
                  }
                </p>

                <p>
                  Risk:
                  {" "}
                  {
                    product.riskLevel
                  }
                </p>

                <p>
                  Return:
                  {" "}
                  {
                    product.expectedReturnMin
                  }
                  %
                  -
                  {
                    product.expectedReturnMax
                  }
                  %
                </p>

                <p>
                  Minimum:
                  {" "}
                  ₹
                  {
                    product.minimumInvestment
                  }
                </p>

                <p>
                  Provider:
                  {" "}
                  {
                    product.provider
                  }
                </p>

                <p>
                  {
                    product.description
                  }
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

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() =>
                      handleEdit(
                        product
                      )
                    }
                    className="
                      border
                      px-3
                      py-1
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(
                        product._id
                      )
                    }
                    className="
                      border
                      px-3
                      py-1
                    "
                  >
                    Toggle Status
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        product._id
                      )
                    }
                    className="
                      border
                      px-3
                      py-1
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}