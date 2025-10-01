import type { StrapiBase } from "@/types";

export interface InvestigatorItem extends StrapiBase {
  academicFormation?: string;
  academicTitle?: string;
  email: string;
  firstName: string;
  id: number;
  investigationGroup?: string;
  lastName: string;
  orcidUrl?: string;
  profilePhoto: { id: number; documentId: string; url: string };
}

export interface InvestigatorsResponse {
  data: InvestigatorItem[];
}
