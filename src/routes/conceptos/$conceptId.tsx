import { ConceptDetail } from "@/components/ConceptDetail";
import { getConceptById, getConceptNames } from "@/utils/concepts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conceptos/$conceptId")({
  component: ConceptDetail,
  loader: async ({ params, context }) => {
    const { conceptId } = params;
    const { queryClient } = context;

    const conceptsQuery = await queryClient.ensureQueryData({
      queryKey: [`concepts-${conceptId}`, conceptId],
      queryFn: () => getConceptById(Number(conceptId)),
    });

    const allConceptNamesQuery = await queryClient.ensureQueryData({
      queryKey: [`concepts-names`],
      queryFn: () => getConceptNames(),
      staleTime: Infinity,
    });

    return { conceptsQuery, allConceptNamesQuery };
  },
});
