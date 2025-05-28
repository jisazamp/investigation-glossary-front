import type { StrapiBase } from "@/types";

export interface CategoryItem extends StrapiBase {
  id: number;
  name: string;
}

export interface CategoryResponse {
  data: CategoryItem[];
}
