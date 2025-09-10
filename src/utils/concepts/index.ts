import { http } from "@/api";
import qs from "qs";
import type { ConceptResponse, ConceptWithItemResponse } from "./index.type";

const getConceptById = (conceptId: number) => {
  const query = qs.stringify(
    {
      filters: {
        id: { $eq: conceptId },
      },
      populate: {
        authors: { fields: ["id", "firstName", "lastName"] },
      },
    },
    { encodeValuesOnly: true },
  );

  return http.get<ConceptWithItemResponse>(`concepts?${query}`);
};

const getConceptsByCategoryId = (
  categoryId: number,
  startingLetter?: string | null,
) => {
  const query = qs.stringify(
    {
      filters: {
        categories: {
          id: categoryId
            ? {
                $eq: categoryId,
              }
            : {},
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

const getConceptNames = () => {
  const query = qs.stringify(
    {
      fields: ["name"],
      pagination: {
        page: 1,
        pageSize: 100,
      },
    },
    { encodeValuesOnly: true },
  );

  return http.get<ConceptResponse>(`concepts?${query}`);
};

export {
  getConceptById,
  getConceptNames,
  getConcepts,
  getConceptsByCategoryId,
};
