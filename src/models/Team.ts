import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeam extends Document {
  name: string;
  slug: string;
  designation: string;
  position: string;
  role: string;
  picture: string;
  education?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  order: number;
  isActive: boolean;
  isLeadership: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      default: function (this: ITeam) {
        if (!this.name) return "";
        return this.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      },
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    role: {
      type: String,
      default: function (this: ITeam) {
        return `${this.designation || ""} • ${this.position || ""}`.trim();
      },
      trim: true,
    },
    picture: {
      type: String,
      required: [true, "Picture URL or path is required"],
      trim: true,
    },
    education: {
      type: String,
      default: "Metropolitan University, Sylhet",
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLeadership: {
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

if (process.env.NODE_ENV !== "production" && mongoose.models?.Team) {
  delete mongoose.models.Team;
}

export const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema, "teams");

export default Team;
