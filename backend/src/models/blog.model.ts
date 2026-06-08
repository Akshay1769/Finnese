import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IBlog
  extends Document {
  title: string;

  content: string;

  category: string;

  image?: string;

  authorId: mongoose.Types.ObjectId;

  isPublished: boolean;

  isActive: boolean;
}

const blogSchema =
  new Schema<IBlog>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      content: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
      },

      authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      isPublished: {
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

export default mongoose.model<IBlog>(
  "Blog",
  blogSchema
);