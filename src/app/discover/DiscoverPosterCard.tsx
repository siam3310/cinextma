import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Chip,
  Tooltip,
  CardFooter,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { HoverPosterCard } from "@/app/discover/HoverPosterCard";
import Rating from "@/components/movies/Rating";
import { useDisclosure, useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { getImageUrl, mutateMovieTitle } from "@/utils/movies";
import { Movie } from "tmdb-ts/dist/types";
import VaulDrawer from "@/components/ui/overlay/VaulDrawer";
import useBreakpoints from "@/hooks/useBreakpoints";
import { useCallback } from "react";
import { useLongPress } from "use-long-press";
import useDeviceVibration from "@/hooks/useDeviceVibration";

export const DiscoverPosterCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { hovered, ref } = useHover();
  const [opened, handlers] = useDisclosure(false);
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = getImageUrl(movie.poster_path);
  const title = mutateMovieTitle(movie);
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
        content={<HoverPosterCard id={movie.id} />}
      >
        <Link href={`/movie/${movie.id}`}>
          <motion.div layout key={movie.id} className="size-full">
            <Card
              ref={ref}
              {...longPress()}
              isHoverable
              fullWidth
              shadow="md"
              className="group h-full bg-secondary-background"
            >
              <CardHeader className="flex items-center justify-center pb-0">
                <div className="relative size-full">
                  {hovered && (
                    <Icon
                      icon="line-md:play-filled"
                      width="64"
                      height="64"
                      className="absolute-center z-20 text-white"
                    />
                  )}
                  {movie.adult && (
                    <Chip
                      color="danger"
                      size="sm"
                      variant="shadow"
                      className="absolute left-2 top-2 z-20"
                    >
                      18+
                    </Chip>
                  )}
                  <div className="relative overflow-hidden rounded-large">
                    <Image
                      isBlurred
                      alt={title}
                      className="aspect-[2/3] rounded-lg object-cover object-center group-hover:scale-110"
                      src={posterImage}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody className="justify-end pb-1">
                <p className="text-md truncate font-bold">
                  {title} ({releaseYear})
                </p>
              </CardBody>
              <CardFooter className="justify-between pt-0 text-xs">
                <p>{releaseYear}</p>
                <Rating rate={movie?.vote_average} />
              </CardFooter>
            </Card>
          </motion.div>
        </Link>
      </Tooltip>

      <VaulDrawer
        backdrop="blur"
        open={opened}
        onOpenChange={handlers.toggle}
        title={title}
        hiddenTitle
      >
        <HoverPosterCard id={movie.id} fullWidth />
      </VaulDrawer>
    </>
  );
};
