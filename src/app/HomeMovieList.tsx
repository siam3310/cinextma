"use client";

import { Link, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import HomePosterCard from "./HomePosterCard";
import { kebabCase } from "string-ts";
import { useInViewport } from "@mantine/hooks";
import { Movie } from "tmdb-ts/dist/types";
import Carousel from "@/components/ui/wrapper/Carousel";

const HomeMovieList: React.FC<{
  query: Promise<{
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
  }>;
  name: string;
  param: string;
}> = ({ query, name, param }) => {
  const key = kebabCase(name) + "-list";
  const { ref, inViewport } = useInViewport();
  const { data, isPending } = useQuery({
    queryFn: () => query,
    queryKey: [key],
    enabled: inViewport,
  });

  return (
    <section id={key} className="min-h-[250px] md:min-h-[300px]" ref={ref}>
      {isPending ? (
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-grow items-center justify-between">
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-[250px] rounded-lg md:h-[300px]" />
        </div>
      ) : (
        <div className="z-[3] flex flex-col gap-2">
          <div className="flex flex-grow items-center justify-between">
            <h4 className="text-lg font-bold md:text-2xl">{name}</h4>
            <Link
              size="sm"
              href={`/discover?type=${param}`}
              isBlock
              color="foreground"
              className="rounded-full"
            >
              See All &gt;
            </Link>
          </div>
          <Carousel classNames={{ container: "gap-2" }}>
            {data?.results.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="embla__slide flex min-h-fit max-w-fit items-center px-1 py-2"
                >
                  <HomePosterCard movie={movie}></HomePosterCard>
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default HomeMovieList;
