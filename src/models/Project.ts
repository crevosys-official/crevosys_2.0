import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  order: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  modalImage?: string;
  year: number | string;
  description: string;
  tech: string[];
  videoUrl?: string;
  live?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    order: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      default: function (this: IProject) {
        if (!this.title) return "";
        return this.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      },
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Project image URL is required"],
      trim: true,
    },
    modalImage: {
      type: String,
      default: "",
      trim: true,
    },
    year: {
      type: Schema.Types.Mixed,
      default: () => new Date().getFullYear(),
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    tech: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    live: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// In Next.js dev server, delete cached model to prevent stale schema/hooks during HMR
if (process.env.NODE_ENV !== "production" && mongoose.models?.Project) {
  delete mongoose.models.Project;
}

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema, "projects");

export default Project;
