import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeedback extends Document {
  feedback: string;
  sender_name: string;
  sender_profile: string;
  sender_country?: string;
  role?: string;
  company?: string;
  rating: number;
  date: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    feedback: {
      type: String,
      required: [true, "Feedback text is required"],
      trim: true,
    },
    sender_name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    sender_profile: {
      type: String,
      required: [true, "Client profile avatar is required"],
      trim: true,
    },
    sender_country: {
      type: String,
      default: "USA",
      trim: true,
    },
    role: {
      type: String,
      default: "Client",
      trim: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

if (process.env.NODE_ENV !== "production" && mongoose.models?.Feedback) {
  delete mongoose.models.Feedback;
}

export const Feedback: Model<IFeedback> =
  mongoose.models.Feedback ||
  mongoose.model<IFeedback>("Feedback", FeedbackSchema, "feedbacks");

export default Feedback;
