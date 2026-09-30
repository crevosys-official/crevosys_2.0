import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      default: function (this: IService) {
        if (!this.title) return "";
        return this.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      },
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Service icon path/URL is required"],
      default: "/card_icons/Icon.png",
      trim: true,
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
if (process.env.NODE_ENV !== "production" && mongoose.models?.Service) {
  delete mongoose.models.Service;
}

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
