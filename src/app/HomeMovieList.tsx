"use client";

import { Link, Skeleton } from "@nextui-org/react";
import { IconButton } from "@/components/ui/button/IconButton";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import HomePosterCard from "./HomePosterCard";
import { kebabCase } from "string-ts";
import { useInViewport } from "@mantine/hooks";
import { useCustomCarousel } from "@/hooks/useCustomCarousel";

const HomeMovieList: React.FC<{ query: Promise<any>; name: string; param: string }> = ({ query, name, param }) => {
  const { ref, inViewport } = useInViewport();
  const c = useCustomCarousel({ dragFree: true });
  const { data, isPending } = useQuery({
    queryFn: () => query,
    queryKey: [kebabCase(name) + "-list"],
    enabled: inViewport,
  });

  if (!isPending) console.log(data?.results);

  return (
    <div ref={ref}>
      {isPending ? (
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-grow items-center justify-between">
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-[250px] rounded-lg md:h-[300px]" />
        </div>
      ) : (
        <section id="trending" className="z-[3] flex flex-col gap-2">
          <div className="flex flex-grow items-center justify-between">
            <h4 className="text-lg font-bold md:text-2xl">{name}</h4>
            <Link size="sm" href={`/discover?type=${param}`} isBlock color="foreground" className="rounded-full">
              See All &gt;
            </Link>
          </div>
          <div className="embla relative flex w-full flex-col justify-center gap-5">
            <div className="absolute inset-0 z-[5] h-full w-5 bg-gradient-to-r from-background"></div>
            <div className="absolute inset-0 z-[5] h-full w-5 place-self-end bg-gradient-to-l from-background"></div>
            <div className={clsx("-md:-translate-x-3 absolute z-10 hidden", { "md:block": c.canScrollPrev })}>
              <IconButton onPress={c.scrollPrev} size="sm" radius="full" icon="mingcute:left-fill" tooltip="Previous" />
            </div>
            <div className={clsx("-md:translate-x-3 absolute z-10 hidden place-self-end", { "md:block": c.canScrollNext })}>
              <IconButton onPress={c.scrollNext} size="sm" radius="full" icon="mingcute:right-fill" tooltip="Next" />
            </div>
            <div className="embla__viewport" ref={c.emblaRef}>
              <div className="embla__container gap-2">
                {data?.results.map((movie: any) => {
                  return (
                    <div key={movie.id} className="embla__slide flex min-h-fit max-w-fit items-center px-1 py-2">
                      <HomePosterCard movie={movie}></HomePosterCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomeMovieList;
