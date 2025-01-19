import { intervalToDuration } from "date-fns";
import { Movie, MovieDetails } from "tmdb-ts";

/**
 * Converts a movie duration from minutes to a human-readable format.
 *
 * @param minutes - The movie duration in minutes. If not provided, defaults to 0.
 * @returns A string representing the movie duration in the format "Xh Ym", where X is the number of hours and Y is the number of minutes.
 *
 * @example
 */
export function movieDurationString(minutes?: number): string {
  if (!minutes) return "No data";
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
  const hours = duration.hours ? `${duration.hours}h ` : "";
  const mins = duration.minutes ? `${duration.minutes}m` : "";
  return `${hours}${mins}`;
}

/**
 * Constructs a URL for an image from the TMDB API based on the given path and type.
 * If the path is not provided, a fallback URL is returned based on the image type.
 *
 * @param path - The path to the image resource. Optional.
 * @param type - The type of the image, which can be "poster", "backdrop", "title", or "avatar". Defaults to "poster".
 * @param fullSize - A boolean indicating whether to fetch the full-size image. Defaults to false.
 * @returns A string representing the complete URL to the image.
 *
 * @example
 * getImageUrl('somepath.jpg', 'backdrop', true)
 * // returns 'http://image.tmdb.org/t/p/original/somepath.jpg'
 *
 * @example
 * getImageUrl(undefined, 'poster')
 * // returns 'https://dancyflix.com/placeholder.png'
 */
export function getImageUrl(
  path?: string,
  type: "poster" | "backdrop" | "title" | "avatar" = "poster",
  fullSize?: boolean,
): string {
  const size = fullSize ? "original" : "w500";
  const fallback =
    type === "poster"
      ? "https://dancyflix.com/placeholder.png"
      : type === "backdrop"
        ? "https://wallpapercave.com/wp/wp1945939.jpg"
        : "";
  return path ? `http://image.tmdb.org/t/p/${size}/${path}` : fallback;
}

/**
 * Returns the title of a movie in the given language. If the movie is in the given language, the original title is used.
 * Otherwise, the title is used. If the movie is not provided, an empty string is returned.
 *
 * @param movie The movie to get the title for. Optional.
 * @param language The language to get the title in. Defaults to "id".
 * @returns The title of the movie in the given language, or an empty string if the movie is not provided.
 */
export function mutateMovieTitle(movie?: MovieDetails | Movie, language: string = "id"): string {
  if (!movie) return "";
  return movie.original_language === language ? movie.original_title : movie.title;
}
