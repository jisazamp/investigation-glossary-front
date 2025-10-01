import type { InvestigatorsResponse } from "./index.types";
import { http } from "@/api";
import qs from "qs";

const getInvestigators = () => {
  const query = qs.stringify(
    {
      populate: {
        profilePhoto: { fields: ["url"] },
      },
    },
    { encodeValuesOnly: true },
  );

  return http.get<InvestigatorsResponse>(`investigators?${query}`);
};

export { getInvestigators };
