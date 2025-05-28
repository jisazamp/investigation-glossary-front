import { Concepts } from "@/components/Concepts";
import { getCategoryById } from "@/utils/categories";
import { getConceptsByCategoryId } from "@/utils/concepts";
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

  useEffect(() => {
    if (!categoria || !categoryQuery.data.data[0]) navigate({ to: "/" });
  }, [navigate, categoria, categoryQuery.data.data]);

  if (!categoria || !categoryQuery.data.data[0]) return;

  return (
    <Concepts
      concepts={conceptsQuery.data.data}
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
