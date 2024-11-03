import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { intervalToDuration } from "date-fns";
import { DiscoverMoviesFetchQueryType } from "@/types/movie";

const DISCOVER_MOVIES_VALID_QUERY_TYPES = ["discover", "todayTrending", "thisWeekTrending", "popular", "nowPlaying", "upcoming", "topRated"] as const;

/**
 * A utility function to merge Tailwind CSS classes using `clsx` and `tailwind-merge`.
 * This function accepts any number of `ClassValue` inputs and returns a single merged class string.
 *
 * @param inputs - Any number of `ClassValue` inputs representing Tailwind CSS classes.
 * @returns A single merged class string that can be used in JSX elements.
 *
 * @example cn('font-bold', 'text-center')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a movie duration from minutes to a human-readable format.
 *
 * @param minutes - The movie duration in minutes. If not provided, defaults to 0.
 * @returns A string representing the movie duration in the format "Xh Ym", where X is the number of hours and Y is the number of minutes.
 *
 * @example
 */
export function movieDurationString(minutes: number | undefined): string {
  if (!minutes) return "No data";
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
  const hours = duration.hours ? `${duration.hours}h ` : "";
  const mins = duration.minutes ? `${duration.minutes}m` : "";
  return `${hours}${mins}`;
}

/**
 * Checks if the provided query type is valid for fetching movie data.
 *
 * @param type - The query type to validate. It can be a string representing one of the valid query types or null.
 * @returns True if the query type is valid, otherwise false.
 *
 * @example
 * // Valid query types
 * isValidQueryType("discover") // true
 * isValidQueryType("todayTrending") // true
 * isValidQueryType("thisWeekTrending") // true
 * isValidQueryType("popular") // true
 * isValidQueryType("nowPlaying") // true
 * isValidQueryType("upcoming") // true
 * isValidQueryType("topRated") // true
 *
 * @example
 * // Invalid query types
 * isValidQueryType("invalid") // false
 * isValidQueryType(null) // false
 */
export function isValidQueryType(type: string | null): type is DiscoverMoviesFetchQueryType {
  return DISCOVER_MOVIES_VALID_QUERY_TYPES.includes(type as DiscoverMoviesFetchQueryType);
}

/**
 * Validates the provided page number against the total number of pages.
 * If the page number is out of range (greater than the total number of pages or less than 0), it will return 1.
 * Otherwise, it will return the validated page number.
 *
 * @param page - The page number to be validated.
 * @param total - The total number of pages.
 * @returns The validated page number if it's within the valid range, otherwise 1.
 */
export function validatePageNumber(page: number, total: number): number {
  if (page > total || page < 0) return 1;
  return page;
}
