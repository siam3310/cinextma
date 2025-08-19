import { Image, Chip, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDisclosure, useHover } from "@mantine/hooks";
import { getImageUrl, mutateTvShowTitle } from "@/utils/movies";
import { useLongPress } from "use-long-press";
import { useCallback } from "react";
import { TV } from "tmdb-ts/dist/types";
import Rating from "@/components/ui/other/Rating";
import Link from "next/link";
import VaulDrawer from "@/components/ui/overlay/VaulDrawer";
import useBreakpoints from "@/hooks/useBreakpoints";
import useDeviceVibration from "@/hooks/useDeviceVibration";
import TvShowHoverCard from "./HoverCard";

const TvShowHomeCard: React.FC<{ tv: TV }> = ({ tv }) => {
  const { hovered, ref } = useHover();
  const [opened, handlers] = useDisclosure(false);
  const releaseYear = new Date(tv.first_air_date).getFullYear();
  const posterImage = getImageUrl(tv.poster_path);
  const title = mutateTvShowTitle(tv);
  const { mobile } = useBreakpoints();
  const { startVibration } = useDeviceVibration();

  const callback = useCallback(() => {
    handlers.open();
    setTimeout(() => startVibration([100]), 300);
  }, []);

  const longPress = useLongPress(mobile ? callback : null, {
    cancelOnMovement: true,
    threshold: 300,
  });

  return (
    <>
      <Tooltip
        isDisabled={mobile}
        showArrow
        className="bg-secondary-background p-0"
        shadow="lg"
        delay={1000}
        placement="right-start"
        content={<TvShowHoverCard id={tv.id} />}
      >
        <Link href={`/tv/${tv.id}`}>
          <div
            ref={ref}
            {...longPress()}
            className="group motion-preset-focus relative aspect-[2/3] overflow-hidden rounded-lg text-white"
          >
            {hovered && (
              <Icon
                icon="line-md:play-filled"
                width="64"
                height="64"
                className="absolute-center z-20 text-white"
              />
            )}
            {tv.adult && (
              <Chip color="danger" size="sm" variant="flat" className="absolute left-2 top-2 z-20">
                18+
              </Chip>
            )}
            <div className="absolute bottom-0 z-[2] h-1/2 w-full bg-gradient-to-t from-black from-[1%]"></div>
            <div className="absolute bottom-0 z-[3] flex w-full flex-col gap-1 px-4 py-3">
              <h6 className="truncate text-sm font-semibold">
                {title} ({releaseYear})
              </h6>
              <div className="flex justify-between text-xs">
                <p>{releaseYear}</p>
                <Rating rate={tv.vote_average} />
              </div>
            </div>
            <Image
              alt={title}
              src={posterImage}
              radius="none"
              className="z-0 aspect-[2/3] h-[250px] object-cover object-center transition group-hover:scale-110 md:h-[300px]"
              classNames={{
                img: "group-hover:opacity-70",
              }}
            />
          </div>
        </Link>
      </Tooltip>

      {mobile && (
        <VaulDrawer
          backdrop="blur"
          open={opened}
          onOpenChange={handlers.toggle}
          title={title}
          hiddenTitle
        >
          <TvShowHoverCard id={tv.id} fullWidth />
        </VaulDrawer>
      )}
    </>
  );
};

export default TvShowHomeCard;
