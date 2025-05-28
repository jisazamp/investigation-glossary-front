import { http } from "@/api";
import qs from "qs";
import type { ConceptResponse } from "./index.type";

const getConceptsByCategoryId = (categoryId: number) => {
  const query = qs.stringify(
    {
      filters: {
        categories: {
          id: {
            $eq: categoryId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return http.get<ConceptResponse>(`concepts?${query}`);
};

export { getConceptsByCategoryId };
