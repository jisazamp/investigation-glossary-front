import type { CategoryItem } from "@/utils/categories/index.types";
import type { ConceptItem, Meta } from "@/utils/concepts/index.type";

export interface ConceptsProps {
  category: CategoryItem | null;
  concepts: ConceptItem[];
  pagination?: Meta;
  selectedLetter: string | null;
  onFilter: (letter: string | null) => void;
  onPageChange: (newPage: number) => void;
}
