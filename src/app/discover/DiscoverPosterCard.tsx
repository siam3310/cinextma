import { Card, CardHeader, CardBody, Image, Chip, Tooltip, CardFooter, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { HoverPosterCard } from "@/app/discover/HoverPosterCard";
import { Movie } from "tmdb-ts";
import Rating from "@/components/movies/Rating";
import { useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";

export const DiscoverPosterCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { hovered, ref } = useHover();
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = getImageUrl(movie.poster_path);

  return (
    <Tooltip showArrow className="hidden p-0 md:block" shadow="lg" delay={1000} placement="right-start" content={<HoverPosterCard id={movie.id} />}>
      <Link href={`/movie/${movie.id}`}>
        <motion.div
          layout
          key={movie.id}
          initial={{ opacity: 0, scale: 0.8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="size-full"
        >
          <Card ref={ref} isHoverable fullWidth shadow="md" className="group h-full bg-secondary-background">
            <CardHeader className="flex items-center justify-center">
              <div className="relative size-full">
                {hovered && <Icon icon="line-md:play-filled" width="64" height="64" className="absolute-center z-20 text-white" />}
                {movie.adult && (
                  <Chip color="danger" size="sm" variant="shadow" className="absolute left-2 top-2 z-20">
                    18+
                  </Chip>
                )}
                <div className="relative overflow-hidden rounded-large">
                  <Image
                    isBlurred
                    alt={movie.original_language === "id" ? movie.original_title : movie.title}
                    className="aspect-[2/3] rounded-lg object-cover object-center group-hover:scale-110"
                    src={posterImage}
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody className="justify-end pb-1">
              <p className="text-md truncate font-bold">
                {movie.original_language === "id" ? movie.original_title : movie.original_language === "id" ? movie.original_title : movie.title} (
                {releaseYear})
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
  );
};
