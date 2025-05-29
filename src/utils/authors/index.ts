import { http } from "@/api";
import type { AuthorsResponse } from "./index.types";

const getAuthors = () => http.get<AuthorsResponse>("authors");

export { getAuthors };
