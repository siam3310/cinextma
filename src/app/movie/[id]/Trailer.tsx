import { IconButton } from "@/components/ui/button/IconButton";
import { useCustomCarousel } from "@/hooks/useCustomCarousel";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Modal, ModalBody, ModalContent, Skeleton, useDisclosure } from "@nextui-org/react";
import clsx from "clsx";
import { Video } from "tmdb-ts/dist/types/credits";

interface TrailerProps {
  videos: Video[];
}

export default function Trailer({ videos }: TrailerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const c = useCustomCarousel();
  const trailers = videos.filter((trailer) => trailer.site === "YouTube");

  return (
    <>
      <Button color="danger" variant="shadow" startContent={<Icon icon="mdi:youtube" fontSize={24} />} onPress={onOpen}>
        Trailer
      </Button>

      <Modal backdrop="blur" size="5xl" isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          <ModalBody className="p-3 md:p-8">
            <div className="embla flex flex-col justify-center gap-5">
              {videos.length > 1 && (
                <>
                  <div className={clsx("absolute z-10 md:-translate-x-5")}>
                    <IconButton
                      isDisabled={!c.canScrollPrev}
                      onPress={c.scrollPrev}
                      size="sm"
                      radius="full"
                      icon="mingcute:left-fill"
                      tooltip="Previous"
                    />
                  </div>
                  <div className={clsx("absolute z-10 place-self-end md:translate-x-5")}>
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
              <div className="embla__viewport" ref={c.emblaRef}>
                <div className="embla__container gap-2">
                  {trailers.map((trailer, index) => {
                    const inView = index === c.selectedIndex;
                    return (
                      <div key={trailer.key} className="embla__slide flex aspect-video size-full items-center rounded-large px-1 py-2">
                        <Skeleton isLoaded={inView} className="aspect-video size-full rounded-large">
                          {inView && (
                            <iframe
                              width="560"
                              height="315"
                              className="aspect-video size-full rounded-large"
                              src={`https://www.youtube.com/embed/${trailer.key}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              loading="lazy"
                            ></iframe>
                          )}
                        </Skeleton>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="embla__dots inline-flex justify-center gap-2">
              {trailers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => c.scrollTo(index)}
                  className={cn("size-2 rounded-full bg-secondary-foreground transition-all", {
                    "w-6 bg-gray-500": index === c.selectedIndex,
                  })}
                ></button>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
