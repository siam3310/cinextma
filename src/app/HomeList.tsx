"use client";

import { Link, Skeleton } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import { IconButton } from "@/components/ui/button/IconButton";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import HomePosterCard from "./HomePosterCard";
import { kebabCase } from "string-ts";
// import { useInView } from "react-intersection-observer";

// const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { ref, inView } = useInView({
//     threshold: 0,
//     triggerOnce: true,
//   });

//   return (
//     <div ref={ref}>
//       {inView ? (
//         children
//       ) : (
//         <div className="flex flex-col gap-5">
//           <div className="flex flex-grow items-center justify-between">
//             <Skeleton className="h-7 w-28 rounded-lg" />
//             <Skeleton className="h-5 w-20 rounded-lg" />
//           </div>
//           <Skeleton className="h-[250px] w-full rounded-lg md:h-[300px]" />
//         </div>
//       )}
//     </div>
//   );
// };

const HomeList: React.FC<{ query: any; name: string }> = ({ query, name }) => {
  const { data, isPending } = useQuery({
    queryFn: () => query,
    queryKey: [kebabCase(name) + "-list"],
  });

  if (!isPending) console.log(data?.results);

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
    <>
      {isPending ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-grow items-center justify-between">
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-[250px] w-full rounded-lg md:h-[300px]" />
        </div>
      ) : (
        <section id="trending" className="z-[3] flex flex-col gap-2">
          <div className="flex flex-grow items-center justify-between">
            <h4 className="text-2xl font-bold">{name}</h4>
            <Link href="/" isBlock color="foreground">
              See All &gt;
            </Link>
          </div>
          <div className="embla relative flex w-full flex-col justify-center gap-5">
            <div className="absolute inset-0 z-[5] h-full w-5 bg-gradient-to-r from-background"></div>
            <div className="absolute inset-0 z-[5] h-full w-5 place-self-end bg-gradient-to-l from-background"></div>
            <div className={clsx("-md:-translate-x-3 absolute z-10 hidden", { "md:block": canScrollPrev })}>
              <IconButton onPress={scrollPrev} size="sm" radius="full" iconName="mingcute:left-fill" tooltip="Previous" />
            </div>
            <div className={clsx("-md:translate-x-3 absolute z-10 hidden place-self-end", { "md:block": canScrollNext })}>
              <IconButton onPress={scrollNext} size="sm" radius="full" iconName="mingcute:right-fill" tooltip="Next" />
            </div>
            <div className="embla__viewport" ref={emblaRef}>
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
    </>
  );
};

export default HomeList;
