import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IChat
  extends Document {

  senderId:
    mongoose.Types.ObjectId;

  receiverId:
    mongoose.Types.ObjectId;

  message: string;

  isRead: boolean;

  isActive: boolean;
}

const chatSchema =
  new Schema<IChat>(
    {
      senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      isRead: {
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

export default mongoose.model<IChat>(
  "Chat",
  chatSchema
);