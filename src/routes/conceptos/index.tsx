import { Concepts } from "@/components/Concepts";
import { LoadingComponent } from "@/components/LoadingComponent";
import { getCategoryById } from "@/utils/categories";
import type { CategoryResponse } from "@/utils/categories/index.types";
import { getConcepts, getConceptsByCategoryId } from "@/utils/concepts";
import type { ConceptResponse } from "@/utils/concepts/index.type";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  titulo: z.string().nullable().optional(),
  categoria: z.number().nullable().optional(),
});

type ConceptSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/conceptos/")({
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
    let conceptsQuery: AxiosResponse<ConceptResponse, unknown> | null = null;
    let categoryQuery: AxiosResponse<CategoryResponse, unknown> | null = null;

    const getConceptsQuery = () => {
      if (titulo && !categoria) return [`concepts-${titulo}`, titulo];
      if (!titulo && categoria) return [`concepts-${categoria}`, categoria];
      if (titulo && categoria)
        return [`concepts-${titulo}-${categoria}`, titulo, categoria];
      return ["concepts"];
    };

    if (titulo || categoria) {
      conceptsQuery = await queryClient.ensureQueryData({
        queryKey: getConceptsQuery(),
        queryFn: () => getConceptsByCategoryId(Number(categoria), titulo),
      });
    }

    if (categoria) {
      categoryQuery = await queryClient.ensureQueryData({
        queryKey: [`category-${categoria}`],
        queryFn: () => getCategoryById(Number(categoria)),
      });
    }

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
  const [page, setPage] = useState(1);

  const { conceptsQuery, categoryQuery, titulo, categoria } =
    Route.useLoaderData();
  const navigate = Route.useNavigate();
  const isPending = useIsFetching();

  const { data: allConcepts } = useQuery({
    queryFn: () => getConcepts(titulo ?? undefined, page),
    queryKey: ["concepts", titulo, page],
    enabled: !categoria,
    staleTime: 300000,
    gcTime: 300000,
  });

  const getConceptsData = () => {
    if (titulo && !categoria) return allConcepts?.data.data;
    if (!titulo && !categoria) return allConcepts?.data.data;
    return conceptsQuery?.data.data;
  };

  const getConceptsPaginationData = () => {
    if (titulo && !categoria) return allConcepts?.data.meta;
    if (!titulo && !categoria) return allConcepts?.data.meta;
    return conceptsQuery?.data.meta;
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      {!!isPending && <LoadingComponent />}
      <Concepts
        concepts={getConceptsData() ?? []}
        category={categoryQuery?.data.data[0] ?? null}
        selectedLetter={titulo ?? null}
        pagination={getConceptsPaginationData()}
        onFilter={(letter) => {
          navigate({
            search: letter ? { titulo: letter, categoria } : { categoria },
          });
        }}
        onPageChange={onPageChange}
      />
    </>
  );
}
