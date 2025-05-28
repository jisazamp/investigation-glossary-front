import { http } from "@/api";
import type { CategoryResponse } from "./index.types";

const getCategories = () => http.get<CategoryResponse>("categories");

export { getCategories };
