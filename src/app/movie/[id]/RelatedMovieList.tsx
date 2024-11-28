"use client";

import IconButton from "@/components/ui/button/IconButton";
import clsx from "clsx";
import { useCustomCarousel } from "@/hooks/useCustomCarousel";
import HomePosterCard from "@/app/HomePosterCard";
import { Movie } from "tmdb-ts/dist/types";
import { ScrollShadow } from "@nextui-org/react";

const RelatedMovieList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const c = useCustomCarousel({ dragFree: true });

  return (
    <div className="z-[3] flex flex-col gap-2">
      <ScrollShadow orientation="horizontal" visibility="both" size={20} hideScrollBar>
        <div className="embla relative flex w-full flex-col justify-center gap-5">
          <div className={clsx("absolute z-10 hidden md:block")}>
            <IconButton isDisabled={!c.canScrollPrev} onPress={c.scrollPrev} size="sm" radius="full" icon="mingcute:left-fill" tooltip="Previous" />
          </div>
          <div className={clsx("absolute z-10 hidden place-self-end md:block")}>
            <IconButton isDisabled={!c.canScrollNext} onPress={c.scrollNext} size="sm" radius="full" icon="mingcute:right-fill" tooltip="Next" />
          </div>
          <div className="embla__viewport" ref={c.emblaRef}>
            <div className="embla__container gap-2">
              {movies.map((movie: any) => {
                return (
                  <div key={movie.id} className="embla__slide flex min-h-fit max-w-fit items-center px-1 py-2">
                    <HomePosterCard movie={movie}></HomePosterCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
};

export default RelatedMovieList;
