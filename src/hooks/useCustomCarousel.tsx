"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { useCallback, useState } from "react";

export const useCustomCarousel = (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => {
  const [emblaRef, embla] = useEmblaCarousel(options, plugins);

  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  if (embla) {
    embla.on("select", () => {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
      setSelectedIndex(embla.selectedScrollSnap());
    });
  }

  return { emblaRef, scrollTo, scrollNext, scrollPrev, selectedIndex, canScrollNext, canScrollPrev };
};
