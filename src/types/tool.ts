export interface ToolItem {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  icon: string;
  category?: string;
  isWhite?: boolean;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
