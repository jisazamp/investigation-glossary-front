import { Home } from "@/components/Home";
import { getAuthorByName } from "@/utils/authors";
import type { AuthorsResponse } from "@/utils/authors/index.types";
import { getConceptNames, getConcepts } from "@/utils/concepts";
import type { ConceptResponse } from "@/utils/concepts/index.type";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { z } from "zod";

export const MINIMUM_SEARCH_LENGTH = 2;

const searchSchema = z.object({ nombre: z.string().optional().nullable() });
type HomeSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/")({
  validateSearch: (search): HomeSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) {
      return { nombre: null };
    }
    return parsed.data.nombre &&
      parsed.data.nombre.length > MINIMUM_SEARCH_LENGTH
      ? { nombre: parsed.data.nombre }
      : {};
  },

  loaderDeps: ({ search }): HomeSearch => {
    const parsed = searchSchema.safeParse(search);
    if (!parsed.success) {
      return { nombre: null };
    }
    return {
      nombre:
        parsed.data.nombre && parsed.data.nombre.length > MINIMUM_SEARCH_LENGTH
          ? parsed.data.nombre
          : null,
    };
  },

  loader: async ({ deps: { nombre }, context: { queryClient } }) => {
    let conceptsQuery: AxiosResponse<ConceptResponse, unknown> | null = null;
    let authorsQuery: AxiosResponse<AuthorsResponse, unknown> | null = null;
    let conceptNamesQuery: AxiosResponse<unknown, unknown> | null = null;

    conceptNamesQuery = await queryClient.ensureQueryData({
      queryKey: [`concept-names`],
      queryFn: () => getConceptNames(),
    });

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

    return { authorsQuery, conceptsQuery, conceptNamesQuery };
  },

  component: Home,
});
