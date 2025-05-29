import type { CategoryItem } from "@/utils/categories/index.types";
import type { ConceptItem } from "@/utils/concepts/index.type";

export interface ConceptsProps {
  category: CategoryItem | null;
  concepts: ConceptItem[];
  selectedLetter: string | null;
  onFilter: (letter: string | null) => void;
}
