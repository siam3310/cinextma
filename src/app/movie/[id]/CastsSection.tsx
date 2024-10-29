"use client";

import { User } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import { IconButton } from "@/components/ui/button/IconButton";
import clsx from "clsx";

const CastsSection: React.FC<{ casts: any }> = ({ casts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (emblaApi) {
    emblaApi.on("scroll", () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    });
  }

  return (
    <section id="casts" className="z-[3] flex flex-col gap-2">
      <h4 className="text-xl font-bold">Top Cast</h4>
      <div className="embla relative flex w-full flex-col justify-center gap-5">
        <div className="absolute inset-0 z-[5] h-full w-12 bg-gradient-to-r from-background"></div>
        <div className="absolute inset-0 z-[5] h-full w-12 place-self-end bg-gradient-to-l from-background"></div>
        <div className={clsx("-md:-translate-x-3 absolute z-10 hidden", { "md:block": canScrollPrev })}>
          <IconButton onPress={scrollPrev} size="sm" radius="full" iconName="mingcute:left-fill" tooltip="Previous" />
        </div>
        <div className={clsx("-md:translate-x-3 absolute z-10 hidden place-self-end", { "md:block": canScrollNext })}>
          <IconButton onPress={scrollNext} size="sm" radius="full" iconName="mingcute:right-fill" tooltip="Next" />
        </div>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container gap-8">
            {casts.map((cast: any, index: number) => {
              const avatar = process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL + cast.profile_path;
              return (
                <div key={index} className="embla__slide flex max-w-fit items-center px-1 py-2">
                  <User
                    name={cast.name}
                    description={cast.character}
                    avatarProps={{
                      src: avatar,
                      size: "lg",
                      showFallback: true,
                      isBordered: true,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CastsSection;
