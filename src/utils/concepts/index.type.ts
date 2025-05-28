import type { StrapiBase } from "@/types";

export interface ConceptItem extends StrapiBase {
  id: number;
  name: string;
  content: string;
}

export interface ConceptResponse {
  data: ConceptItem[];
}
