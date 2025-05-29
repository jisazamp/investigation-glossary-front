import { Home } from "@/components/Home";
import { getAuthorByName } from "@/utils/authors";
import type { AuthorsResponse } from "@/utils/authors/index.types";
import { getConcepts } from "@/utils/concepts";
import type { ConceptResponse } from "@/utils/concepts/index.type";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { z } from "zod";

const searchSchema = z.object({ nombre: z.string().optional().nullable() });
type HomeSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/")({
  validateSearch: (search): HomeSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) {
      return { nombre: null };
    }
    return parsed.data.nombre ? { nombre: parsed.data.nombre } : {};
  },

  loaderDeps: ({ search }): HomeSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) {
      return { nombre: null };
    }
    return { nombre: parsed.data.nombre ?? null };
  },

  loader: async ({ deps: { nombre }, context: { queryClient } }) => {
    let conceptsQuery: AxiosResponse<ConceptResponse, unknown> | null = null;
    let authorsQuery: AxiosResponse<AuthorsResponse, unknown> | null = null;
    if (nombre) {
      conceptsQuery = await queryClient.ensureQueryData({
        queryKey: [`concepts-${nombre}`, nombre],
        queryFn: () => getConcepts(nombre ?? undefined),
      });

      authorsQuery = await queryClient.ensureQueryData({
        queryKey: [`authors-${nombre}`, nombre],
        queryFn: () => getAuthorByName(nombre),
      });
    }

    return { authorsQuery, conceptsQuery };
  },

  component: Home,
});
