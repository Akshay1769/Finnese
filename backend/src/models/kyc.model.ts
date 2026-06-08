import mongoose, { Document, Schema } from "mongoose";

export interface IKyc extends Document {
  userId: mongoose.Types.ObjectId;

  panNumber: string;
  aadhaarNumber: string;
  address: string;
  occupation: string;

  status: "pending" | "approved" | "rejected";

  remarks?: string;

  isActive: boolean;
}

const kycSchema = new Schema<IKyc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    panNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    aadhaarNumber: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    occupation: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    remarks: {
      type: String,
      default: "",
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

export default mongoose.model<IKyc>(
  "Kyc",
  kycSchema
);