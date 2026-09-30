export interface ServiceItem {
  id?: number | string;
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  icon: string;
  order?: number;
  isActive?: boolean;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    order: 1,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743371/crevosys/services/ghuumarstp3ikzie6trp.png",
    title: "Development",
    slug: "development",
    description:
      "Development and building amazing digital products with best user experiences strategy.",
    isActive: true,
  },
  {
    order: 2,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743402/crevosys/services/cgvfd5lhmxkkdimbtif5.png",
    title: "Marketing",
    slug: "marketing",
    description:
      "Marketing services starts and ends within a strategy builds wireframe & solid prototyping posts design.",
    isActive: true,
  },
  {
    order: 3,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743410/crevosys/services/npr1r4njujfxbnuuowsc.png",
    title: "Design",
    slug: "design",
    description:
      "We design professional looking yet simple Logo are search engine and user friendly.",
    isActive: true,
  },
  {
    order: 4,
    icon: "https://res.cloudinary.com/v8uaci4y/image/upload/v1790743412/crevosys/services/khipa8xxpoinjrozutcr.png",
    title: "Automation",
    slug: "automation",
    description:
      "Streamline and optimize your business processes with our cutting-edge AI automation solutions.",
    isActive: true,
  },
];
