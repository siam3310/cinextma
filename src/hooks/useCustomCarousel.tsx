"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { useCallback, useState } from "react";

export const useCustomCarousel = (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

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

  return { emblaRef, scrollNext, scrollPrev, canScrollNext, canScrollPrev };
};
