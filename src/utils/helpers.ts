import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge Tailwind CSS classes using `clsx` and `tailwind-merge`.
 * This function accepts any number of `ClassValue` inputs and returns a single merged class string.
 *
 * @param inputs - Any number of `ClassValue` inputs representing Tailwind CSS classes.
 * @returns A single merged class string that can be used in JSX elements.
 *
 * @example cn('font-bold', 'text-center')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
