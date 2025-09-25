import type { StrapiBase } from "@/types";
import type { AuthorItem } from "../authors/index.types";

export interface ConceptItem extends StrapiBase {
  id: number;
  name: string;
  content: string;
}

interface ConceptImage {
  id: string;
  documentId: string;
  url: string;
}

export interface ConceptWithAuthorItem extends StrapiBase {
  id: number;
  name: string;
  content: string;
  authors: Pick<AuthorItem, "id" | "firstName" | "lastName">[];
  images: ConceptImage[];
}

export interface ConceptResponse {
  data: ConceptItem[];
}

export interface ConceptWithItemResponse {
  data: ConceptWithAuthorItem[];
}
