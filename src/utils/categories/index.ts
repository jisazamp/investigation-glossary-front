import { http } from "@/api";
import qs from "qs";
import type { CategoryResponse } from "./index.types";

const getCategories = () => http.get<CategoryResponse>("categories");

const getCategoryById = (categoryId: number) => {
  const query = qs.stringify(
    {
      filters: {
        id: {
          $eq: categoryId,
        },
      },
    },
    { encodeValuesOnly: true },
  );

  return http.get<CategoryResponse>(`categories?${query}`);
};

export { getCategories, getCategoryById };
