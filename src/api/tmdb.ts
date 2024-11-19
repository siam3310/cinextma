import { TMDB } from "tmdb-ts";

const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ?? "";

export const tmdb = new TMDB(token);
