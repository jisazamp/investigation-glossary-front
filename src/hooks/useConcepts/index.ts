import { getConceptsByCategoryId } from "@/utils/concepts";
import type { ConceptResponse } from "@/utils/concepts/index.type";
import { useQueryClient } from "@tanstack/react-query";

const useConcepts = (categoryId: number, filterLetter?: string | null) => {
  const queryClient = useQueryClient();

  const queryKey = filterLetter
    ? [`concepts-${categoryId}-${filterLetter}`, categoryId, filterLetter]
    : [`concepts-${categoryId}`, categoryId];

  queryClient.ensureQueryData({
    queryKey,
    queryFn: () => getConceptsByCategoryId(categoryId, filterLetter),
  });

  return queryClient.getQueryData<ConceptResponse>(queryKey);
};

export { useConcepts };
