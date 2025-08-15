import { isEmpty } from "@/utils/helpers";
import { TMDB } from "tmdb-ts";

const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN!;

if (isEmpty(token)) {
  throw new Error("TMDB_ACCESS_TOKEN is not defined");
}

export const tmdb = new TMDB(token);
