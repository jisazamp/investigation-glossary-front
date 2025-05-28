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
          name: {
            $startsWithi: startingLetter,
          },
        }),
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return http.get<ConceptResponse>(`concepts?${query}`);
};

export { getConceptsByCategoryId };
