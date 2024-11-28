"use client";

import { ScrollShadow, User } from "@nextui-org/react";
import IconButton from "@/components/ui/button/IconButton";
import clsx from "clsx";
import { useCustomCarousel } from "@/hooks/useCustomCarousel";
import { Cast } from "tmdb-ts";
import { getImageUrl } from "@/utils/movies";

const CastsSection: React.FC<{ casts: Cast[] }> = ({ casts }) => {
  const c = useCustomCarousel({ dragFree: true });

  return (
    <section id="casts" className="z-[3] flex flex-col gap-2">
      <h4 className="text-xl font-bold">Top Cast</h4>
      <ScrollShadow orientation="horizontal" visibility="both" size={20} hideScrollBar>
        <div className="embla relative flex w-full flex-col justify-center gap-5">
          <div className={clsx("-md:-translate-x-5 absolute z-10 hidden md:block")}>
            <IconButton isDisabled={!c.canScrollPrev} onPress={c.scrollPrev} size="sm" radius="full" icon="mingcute:left-fill" tooltip="Previous" />
          </div>
          <div className={clsx("-md:translate-x-5 absolute z-10 hidden place-self-end md:block")}>
            <IconButton isDisabled={!c.canScrollNext} onPress={c.scrollNext} size="sm" radius="full" icon="mingcute:right-fill" tooltip="Next" />
          </div>
          <div className="embla__viewport" ref={c.emblaRef}>
            <div className="embla__container gap-8">
              {casts.map((cast, index) => {
                const avatar = getImageUrl(cast.profile_path, "avatar");
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
      </ScrollShadow>
    </section>
  );
};

export default CastsSection;
