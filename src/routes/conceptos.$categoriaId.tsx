import { Concepts } from "@/components/Concepts";
import { getCategoryById } from "@/utils/categories";
import { getConceptsByCategoryId } from "@/utils/concepts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conceptos/$categoriaId")({
  component: RouteComponent,
  loader: async ({ params: { categoriaId }, context: { queryClient } }) => {
    const conceptsQuery = await queryClient.ensureQueryData({
      queryKey: [`concepts-${categoriaId}`, categoriaId],
      queryFn: () => getConceptsByCategoryId(Number(categoriaId)),
    });
    const categoryQuery = await queryClient.ensureQueryData({
      queryKey: [`category-${categoriaId}`],
      queryFn: () => getCategoryById(Number(categoriaId)),
    });
    return { categoryId: categoriaId, conceptsQuery, categoryQuery };
  },
});

function RouteComponent() {
  const { conceptsQuery, categoryQuery } = Route.useLoaderData();
  return (
    <Concepts
      concepts={conceptsQuery.data.data}
      category={categoryQuery.data.data[0]}
    />
  );
}
