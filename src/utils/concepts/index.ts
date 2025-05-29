import { http } from "@/api";
import qs from "qs";
import type { ConceptResponse } from "./index.type";

const getConceptsByCategoryId = (
  categoryId: number,
  startingLetter?: string | null,
) => {
  const query = qs.stringify(
    {
      filters: {
        categories: {
          id: {
            $eq: categoryId,
          },
        },
        ...(startingLetter && {
          name:
            startingLetter.length === 1
              ? {
                  $startsWithi: startingLetter,
                }
              : { $containsi: startingLetter },
        }),
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return http.get<ConceptResponse>(`concepts?${query}`);
};

const getConcepts = (title?: string) => {
  const query = qs.stringify({
    filters: {
      ...(title && {
        name:
          title.length > 1 ? { $containsi: title } : { $startsWithi: title },
      }),
    },
  });

  return http.get<ConceptResponse>(`concepts?${query}`);
};

export { getConceptsByCategoryId, getConcepts };
