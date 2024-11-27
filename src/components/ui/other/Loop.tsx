import { ReactNode, Fragment } from "react";

interface LoopProps {
  count: number;
  prefix?: string;
  children: ReactNode;
}

/**
 * Loops the given children component `count` times.
 * Useful for mocking data before real data is available.
 *
 * @param count The number of times to loop the children.
 * @param prefix The prefix to use for the React key.
 * @param children The children component to loop.
 */
export default function Loop({ count, prefix = "LoopComponent", children }: LoopProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Fragment key={`${prefix}-${index + 1}`}>{children}</Fragment>
      ))}
    </>
  );
}
