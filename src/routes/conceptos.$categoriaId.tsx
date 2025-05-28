import { Concepts } from "@/components/Concepts";
import { getCategoryById } from "@/utils/categories";
import { getConceptsByCategoryId } from "@/utils/concepts";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  filtrarPorLetra: z.string().nullable().optional(),
});

type ConceptsSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/conceptos/$categoriaId")({
  validateSearch: (search: Record<string, unknown>): ConceptsSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) {
      return { filtrarPorLetra: null };
    }

    return {
      filtrarPorLetra:
        parsed.data.filtrarPorLetra === "" ? null : parsed.data.filtrarPorLetra,
    };
  },

  loaderDeps: ({ search }) => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) return { filtrarPorLetra: null };
    return {
      filtrarPorLetra:
        parsed.data.filtrarPorLetra === "" ? null : parsed.data.filtrarPorLetra,
    };
  },

  loader: async ({
    params: { categoriaId },
    deps: { filtrarPorLetra },
    context: { queryClient },
  }) => {
    const conceptsQuery = await queryClient.ensureQueryData({
      queryKey: filtrarPorLetra
        ? [
            `concepts-${categoriaId}-${filtrarPorLetra}`,
            categoriaId,
            filtrarPorLetra,
          ]
        : [`concepts-${categoriaId}`, categoriaId],
      queryFn: () =>
        getConceptsByCategoryId(Number(categoriaId), filtrarPorLetra),
    });

    const categoryQuery = await queryClient.ensureQueryData({
      queryKey: [`category-${categoriaId}`],
      queryFn: () => getCategoryById(Number(categoriaId)),
    });

    return {
      categoryId: categoriaId,
      conceptsQuery,
      categoryQuery,
      filtrarPorLetra,
    };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { conceptsQuery, categoryQuery, filtrarPorLetra } =
    Route.useLoaderData();
  const navigate = Route.useNavigate();

  return (
    <Concepts
      concepts={conceptsQuery.data.data}
      category={categoryQuery.data.data[0]}
      selectedLetter={filtrarPorLetra ?? null}
      onFilter={(letter) => {
        navigate({
          search: letter ? { filtrarPorLetra: letter } : {},
        });
      }}
    />
  );
}
