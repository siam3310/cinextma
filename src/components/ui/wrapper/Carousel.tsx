"use client";

import { useCustomCarousel } from "@/hooks/useCustomCarousel";
import { ScrollShadow } from "@heroui/react";
import React from "react";
import IconButton from "../button/IconButton";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { cn } from "@/utils/helpers";
import styles from "@/styles/embla-carousel.module.css";

interface CarouselProps {
  children: React.ReactNode;
  withScrollShadow?: boolean;
  isButtonDisabled?: boolean;
  autoHideButton?: boolean;
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  classNames?: {
    container?: string;
    viewport?: string;
    wrapper?: string;
  };
}

const Carousel = ({
  children,
  withScrollShadow = false,
  isButtonDisabled = false,
  autoHideButton = true,
  options = { dragFree: true },
  plugins,
  classNames,
}: CarouselProps) => {
  const c = useCustomCarousel(options, plugins);

  return (
    <ScrollShadow
      isEnabled={withScrollShadow}
      orientation="horizontal"
      visibility="both"
      size={20}
      hideScrollBar
    >
      <div
        className={cn(styles.wrapper, classNames?.wrapper, {
          "relative flex w-full flex-col justify-center": !isButtonDisabled,
        })}
      >
        {!isButtonDisabled && (
          <>
            <div
              className={cn("absolute z-10", {
                "hidden md:block": autoHideButton,
              })}
            >
              <IconButton
                isDisabled={!c.canScrollPrev}
                onPress={c.scrollPrev}
                size="sm"
                radius="full"
                icon="mingcute:left-fill"
                tooltip="Previous"
              />
            </div>
            <div
              className={cn("absolute z-10 place-self-end", {
                "hidden md:block": autoHideButton,
              })}
            >
              <IconButton
                isDisabled={!c.canScrollNext}
                onPress={c.scrollNext}
                size="sm"
                radius="full"
                icon="mingcute:right-fill"
                tooltip="Next"
              />
            </div>
          </>
        )}
        <div className={cn(styles.viewport, classNames?.viewport)} ref={c.emblaRef}>
          <div className={cn(styles.container, classNames?.container)}>{children}</div>
        </div>
      </div>
    </ScrollShadow>
  );
};

export default Carousel;
