export interface Project {
  _id?: string;
  id?: number | string;
  order?: number;
  title: string;
  slug?: string;
  category: string;
  image: string;
  modalImage?: string;
  year: string | number;
  description: string;
  tech: string[];
  videoUrl?: string;
  live?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
