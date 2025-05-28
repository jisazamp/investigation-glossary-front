import { Concepts } from "@/components/Concepts";
import { getCategoryById } from "@/utils/categories";
import { getConceptsByCategoryId } from "@/utils/concepts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  const [filterByLetter, setFilterByLetter] = useState<string | null>(null);

  const { conceptsQuery, categoryQuery, categoryId } = Route.useLoaderData();

  const { data: filteredConcepts } = useQuery({
    queryKey: [
      `concept-starts-with-${filterByLetter}-${categoryId}`,
      filterByLetter,
      categoryId,
    ],
    queryFn: () => getConceptsByCategoryId(Number(categoryId), filterByLetter),
    enabled: !!filterByLetter,
  });

  const handleFilter = (letter: string | null) => {
    if (letter === filterByLetter) return setFilterByLetter(null);
    setFilterByLetter(letter);
  };

  return (
    <Concepts
      concepts={
        filterByLetter
          ? (filteredConcepts?.data.data ?? [])
          : conceptsQuery.data.data
      }
      category={categoryQuery.data.data[0]}
      selectedLetter={filterByLetter}
      onFilter={handleFilter}
    />
  );
}
