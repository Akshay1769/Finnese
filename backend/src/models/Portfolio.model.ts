import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IPortfolio
  extends Document {
  name: string;
  description: string;

  riskLevel:
    | "low"
    | "medium"
    | "high";

  targetAmount: number;

  currentAmount: number;

  isActive: boolean;

  userId: mongoose.Types.ObjectId;
}

const portfolioSchema = new Schema<IPortfolio>(
    {
      name: {
        type: String,
        required: true,
      },

      description: {
        type: String,
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

      targetAmount: {
        type: Number,
        required: true,
      },

      currentAmount: {
        type: Number,
        default: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<IPortfolio>("Portfolio", portfolioSchema);