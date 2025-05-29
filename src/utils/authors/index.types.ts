import type { StrapiBase } from "@/types";

export interface AuthorItem extends StrapiBase {
  id: number;
  firstName: string;
  lastName: string;
}

export interface AuthorsResponse {
  data: AuthorItem[];
}
