import { MovieDetails } from "tmdb-ts";

export interface SavedMovieDetails extends MovieDetails {
  adult: boolean;
  backdrop_path: string;
  id: number;
  poster_path?: string;
  release_date: string;
  title: string;
  vote_average: number;
  saved_date: string;
}

export const DISCOVER_MOVIES_VALID_QUERY_TYPES = [
  "discover",
  "todayTrending",
  "thisWeekTrending",
  "popular",
  "nowPlaying",
  "upcoming",
  "topRated",
] as const;

export type DiscoverMoviesFetchQueryType = (typeof DISCOVER_MOVIES_VALID_QUERY_TYPES)[number];
