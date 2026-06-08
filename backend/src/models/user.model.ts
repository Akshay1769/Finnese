import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;

  role: "customer" | "advisor" | "admin";

  customerType:| "advisory" | "financial_services";

  loginProvider: "local" | "google" | "facebook";

  profileImage?: string;

  isEmailVerified: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim :true,
    },

    role: {
      type: String,
      enum: ["customer", "advisor", "admin"],
      default: "customer",
    },

    customerType: {
      type: String,
      enum: ["advisory", "financial_services",],
      default: "advisory",
    },

    loginProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    profileImage: {
      type: String,
      default: "",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
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

const user = mongoose.model<IUser>("User", userSchema);

export default user;