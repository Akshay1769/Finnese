import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IAdvisorBooking
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  advisorId:
    mongoose.Types.ObjectId;

  bookingDate: Date;

  bookingTime: string;

  status:
    | "pending"
    | "approved"
    | "completed"
    | "cancelled";

  remarks: string;

  isActive: boolean;
}

const advisorBookingSchema =
  new Schema<IAdvisorBooking>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      advisorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      bookingDate: {
        type: Date,
        required: true,
      },

      bookingTime: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      remarks: {
        type: String,
        default: "",
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

export default mongoose.model<IAdvisorBooking>(
  "AdvisorBooking",
  advisorBookingSchema
);