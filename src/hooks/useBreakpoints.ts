import { useMediaQuery } from "@mantine/hooks";

/**
 * A custom hook that returns an object indicating the current active breakpoints.
 * Each breakpoint corresponds to a specific minimum viewport width.
 *
 * @returns {object} An object with boolean values for each breakpoint:
 * - `sm`: true if the viewport is less than 640px wide.
 * - `md`: true if the viewport is less than 768px wide.
 * - `lg`: true if the viewport is less than 1024px wide.
 * - `xl`: true if the viewport is less than 1280px wide.
 * - `xxl`: true if the viewport is less than 1536px wide.
 */
export default function useBreakpoints() {
  const sm = !useMediaQuery(`(min-width: 640px)`);
  const md = !useMediaQuery(`(min-width: 768px)`);
  const lg = !useMediaQuery(`(min-width: 1024px)`);
  const xl = !useMediaQuery(`(min-width: 1280px)`);
  const xxl = !useMediaQuery(`(min-width: 1536px)`);

  return { sm, md, lg, xl, xxl };
}
