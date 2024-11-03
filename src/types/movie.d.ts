import { MovieDetails } from "tmdb-ts";

const DISCOVER_MOVIES_VALID_QUERY_TYPES = ["discover", "todayTrending", "thisWeekTrending", "popular", "nowPlaying", "upcoming", "topRated"] as const;

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

export type DiscoverMoviesFetchQueryType = (typeof DISCOVER_MOVIES_VALID_QUERY_TYPES)[number];
