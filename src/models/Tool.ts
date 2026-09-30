import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITool extends Document {
  name: string;
  slug: string;
  icon: string;
  category: string;
  isWhite: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema = new Schema<ITool>(
  {
    name: {
      type: String,
      required: [true, "Tool/Skill name is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      default: function (this: ITool) {
        if (!this.name) return "";
        return this.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      },
    },
    icon: {
      type: String,
      required: [true, "Icon URL or path is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// In Next.js dev server, delete cached model to prevent stale schema/hooks during HMR
if (process.env.NODE_ENV !== "production" && mongoose.models?.Tool) {
  delete mongoose.models.Tool;
}

export const Tool: Model<ITool> =
  mongoose.models.Tool || mongoose.model<ITool>("Tool", ToolSchema, "tools");

export default Tool;
