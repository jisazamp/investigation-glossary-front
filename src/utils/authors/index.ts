import { http } from "@/api";
import qs from "qs";
import type { AuthorsResponse } from "./index.types";

const getAuthors = () => http.get<AuthorsResponse>("authors");

const getAuthorByName = (name?: string | null) => {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          { firstName: { $containsi: name } },
          { lastName: { $containsi: name } },
        ],
      },
    },
    { encodeValuesOnly: true },
  );

  return http.get<AuthorsResponse>(`authors?${query}`);
};

export { getAuthors, getAuthorByName };
