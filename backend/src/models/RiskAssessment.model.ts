import mongoose, { Document, Schema } from "mongoose";

export interface IRiskAssessment extends Document {
  userId: mongoose.Types.ObjectId;

  investmentHorizon: number;
  marketReaction: number;
  riskTolerance: number;

  score: number;

  riskLevel: "low" | "medium" | "high";
}

const riskAssessmentSchema = new Schema<IRiskAssessment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    investmentHorizon: {
      type: Number,
      required: true,
    },

    marketReaction: {
      type: Number,
      required: true,
    },

    riskTolerance: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRiskAssessment>(
  "RiskAssessment",
  riskAssessmentSchema
);