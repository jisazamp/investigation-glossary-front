import type { StrapiBase } from "@/types";

export interface AuthorItem extends StrapiBase {
  id: number;
  description?: string;
  email?: string;
  firstName: string;
  formation?: string;
  lastName: string;
}

export interface AuthorsResponse {
  data: AuthorItem[];
}
