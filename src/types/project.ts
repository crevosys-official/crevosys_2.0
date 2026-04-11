export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  modalImage?: string;
  year: string;
  description: string;
  tech: string[];
  videoUrl: string;
  live?: string;
}
