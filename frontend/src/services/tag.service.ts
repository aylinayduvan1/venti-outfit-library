// services/tag.service.ts
import axios from "axios";
import type { Tag } from "../types/tag";

const API_URL = "http://localhost:4000/tags";

export async function fetchTags(): Promise<Tag[]> {
  const res = await axios.get<Tag[]>(API_URL);
  return res.data;
}
