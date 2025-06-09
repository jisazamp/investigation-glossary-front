import { ConceptDetail } from "@/components/ConceptDetail";
import { getConceptById } from "@/utils/concepts";
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

    return { conceptsQuery };
  },
});
