import { intervalToDuration } from "date-fns";
import { Movie, MovieDetails, TV, TvShowDetails } from "tmdb-ts";

/**
 * Converts a movie duration from minutes to a human-readable format.
 *
 * @param minutes - The movie duration in minutes. If not provided, defaults to 0.
 * @returns A string representing the movie duration in the format "Xh Ym", where X is the number of hours and Y is the number of minutes.
 *
 * @example
 */
export const movieDurationString = (minutes?: number): string => {
  if (!minutes) return "N/A";
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
  const hours = duration.hours ? `${duration.hours}h ` : "";
  const mins = duration.minutes ? `${duration.minutes}m` : "";
  return `${hours}${mins}`;
};

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
export const getImageUrl = (
  path?: string,
  type: "poster" | "backdrop" | "title" | "avatar" = "poster",
  fullSize?: boolean,
): string => {
  const size = fullSize ? "original" : "w500";
  const fallback =
    type === "poster"
      ? "https://dancyflix.com/placeholder.png"
      : type === "backdrop"
        ? "https://wallpapercave.com/wp/wp1945939.jpg"
        : "";
  return path ? `http://image.tmdb.org/t/p/${size}/${path}` : fallback;
};

/**
 * Returns the title of a movie in the given language. If the movie is in the given language, the original title is used.
 * Otherwise, the title is used. If the movie is not provided, an empty string is returned.
 *
 * @param movie The movie to get the title for. Optional.
 * @param language The language to get the title in. Defaults to "id".
 * @returns The title of the movie in the given language, or an empty string if the movie is not provided.
 */
export const mutateMovieTitle = (movie?: MovieDetails | Movie, language: string = "id"): string => {
  if (!movie) return "N/A";
  return movie.original_language === language ? movie.original_title : movie.title;
};

/**
 * Returns the title of a TV show in the given language. If the TV show is in the given language, the original name is used.
 * Otherwise, the name is used. If the TV show is not provided, an empty string is returned.
 *
 * @param tv The TV show to get the title for. Optional.
 * @param language The language to get the title in. Defaults to "id".
 * @returns The title of the TV show in the given language, or an empty string if the TV show is not provided.
 */
export const mutateTvShowTitle = (tv?: TvShowDetails | TV, language: string = "id"): string => {
  if (!tv) return "N/A";
  return tv.original_language === language ? tv.original_name : tv.name;
};

/**
 * Returns a random label for a fun loading animation.
 *
 * @returns A random label for a fun loading animation.
 */
export const getLoadingLabel = (): string => {
  const labels = [
    "Chill dude, even Netflix loads slow sometimes...",
    "Hold up, server grabbing a coffee real quick...",
    "Movie’s on a smoke break, brb...",
    "Still buffering... blame your WiFi not me...",
    "Lowkey this loading screen more fire than the movie...",
    "Relax, director’s adding a secret cutscene...",
    "Bruh... even your ex moved on faster than this load...",
    "Server laggin’ like my brain during exams...",
    "Hang tight, stealing internet from the neighbors...",
    "Loading harder than my life rn...",
    "Movie’s AFK, back in a sec...",
    "No cap, this loading bar just vibin’...",
    "Server caught feelings, give it a sec...",
    "Scene still downloading from 2010...",
    "Director said ‘one more take’, classic...",
    "WiFi feeling insecure, that’s why it’s slow...",
    "This load speed = my crush replying...",
    "Actors still memorizing their lines...",
    "Trust the process… or don’t, idk...",
    "Server buffering vibes, not data...",
    "Yo, film stuck in traffic right now...",
    "Hold tight, server updating its relationship status...",
    "Buffering harder than me tryna wake up early...",
    "Server said ‘brb, bathroom break’...",
    "Loading like my paycheck… always late...",
    "Plot twist: the movie is buffering forever...",
    "Server binge-watching before sending it to you...",
    "WiFi acting sus rn, just wait...",
    "Chillax, the movie downloading from dial-up...",
    "Server just rage quit, loading anyway...",
    "Lowkey I think the server fell asleep...",
    "Buffering like grandma typing on phone...",
    "Movie’s still in rehearsal, trust...",
    "Loading bar flexing for no reason...",
    "Server ghosted us, but it’ll be back...",
    "Bruh this buffering built different...",
    "Lag harder than a potato PC...",
    "Movie’s still getting dressed...",
    "Server scrolling TikTok instead of working...",
  ];

  const randomIndex = Math.floor(Math.random() * labels.length);
  return labels[randomIndex];
};
