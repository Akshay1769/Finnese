import mongoose, { Document, Schema } from "mongoose";

export interface IInvestmentProduct extends Document {
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

const investmentProductSchema =
  new Schema<IInvestmentProduct>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        enum: [
          "mutual_fund",
          "stock",
          "sip",
          "insurance",
        ],
        required: true,
      },

      riskLevel: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
        ],
        required: true,
      },

      expectedReturnMin: {
        type: Number,
        required: true,
      },

      expectedReturnMax: {
        type: Number,
        required: true,
      },

      minimumInvestment: {
        type: Number,
        required: true,
      },

      provider: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<IInvestmentProduct>(
  "InvestmentProduct",
  investmentProductSchema
);