export interface FeedbackItem {
  _id?: string;
  id?: string | number;
  feedback: string;
  sender_name: string;
  sender_profile: string;
  sender_country?: string;
  role?: string;
  company?: string;
  rating?: number;
  date?: string;
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
