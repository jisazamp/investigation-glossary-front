import { Concepts } from "@/components/Concepts";
import { getCategoryById } from "@/utils/categories";
import { getConcepts, getConceptsByCategoryId } from "@/utils/concepts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const searchSchema = z.object({
  titulo: z.string().nullable().optional(),
  categoria: z.number().nullable().optional(),
});

type ConceptSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/conceptos")({
  validateSearch: (search): ConceptSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) {
      return { titulo: null, categoria: null };
    }

    return {
      titulo: parsed.data.titulo === "" ? null : parsed.data.titulo,
      categoria: parsed.data.categoria,
    };
  },

  loaderDeps: ({ search }): ConceptSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) return { titulo: null, categoria: null };
    return {
      titulo: parsed.data.titulo === "" ? null : parsed.data.titulo,
      categoria: parsed.data.categoria,
    };
  },

  loader: async ({ deps: { titulo, categoria }, context: { queryClient } }) => {
    const conceptsQuery = await queryClient.ensureQueryData({
      queryKey: titulo
        ? [`concepts-${categoria}-${titulo}`, categoria, titulo]
        : [`concepts-${categoria}`, categoria],
      queryFn: () => getConceptsByCategoryId(Number(categoria), titulo),
    });

    const categoryQuery = await queryClient.ensureQueryData({
      queryKey: [`category-${categoria}`],
      queryFn: () => getCategoryById(Number(categoria)),
    });

    return {
      categoria,
      categoryQuery,
      conceptsQuery,
      titulo,
    };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { conceptsQuery, categoryQuery, titulo, categoria } =
    Route.useLoaderData();
  const navigate = Route.useNavigate();

  const { data: allConcepts } = useQuery({
    queryFn: () => getConcepts(titulo ?? undefined),
    queryKey: ["concepts", titulo],
    enabled: !categoria,
  });

  const getConceptsData = () => {
    if (titulo && !categoria) return allConcepts?.data.data;
    if (!titulo && !categoria) return allConcepts?.data.data;
    return conceptsQuery.data.data;
  };

  return (
    <Concepts
      concepts={getConceptsData() ?? []}
      category={categoryQuery.data.data[0]}
      selectedLetter={titulo ?? null}
      onFilter={(letter) => {
        navigate({
          search: letter ? { titulo: letter, categoria } : { categoria },
        });
      }}
    />
  );
}
