import type { StrapiBase } from "@/types";
import type { AuthorItem } from "../authors/index.types";

export interface ConceptItem extends StrapiBase {
  id: number;
  name: string;
  content: string;
}

interface ConceptMedia {
  id: string;
  documentId: string;
  url: string;
}

export interface ConceptWithAuthorItem extends StrapiBase {
  id: number;
  name: string;
  content: string;
  authors: Pick<AuthorItem, "id" | "firstName" | "lastName">[];
  images: ConceptMedia[];
  videos: ConceptMedia[];
}

export interface ConceptResponse {
  data: ConceptItem[];
}

export interface ConceptWithItemResponse {
  data: ConceptWithAuthorItem[];
}
