export interface TeamMemberItem {
  _id?: string;
  id?: string | number;
  name: string;
  slug?: string;
  designation: string;
  position: string;
  role?: string;
  picture: string;
  education?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  order?: number;
  isActive?: boolean;
  isLeadership?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
