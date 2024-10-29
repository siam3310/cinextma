import { Card, CardHeader, CardBody, Image, Chip, Tooltip, CardFooter, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { HoverPosterCard } from "@/app/discover/HoverPosterCard";
import { MovieDetails } from "tmdb-ts";
import Rating from "@/components/movies/Rating";

export const DiscoverPosterCard: React.FC<{ movie: MovieDetails }> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL + (movie.poster_path ?? "");

  return (
    <Tooltip showArrow className="hidden p-0 md:block" shadow="lg" delay={1500} placement="right-start" content={<HoverPosterCard id={movie.id} />}>
      <Link href={`/movie/${movie.id}`}>
        <Card
          isHoverable
          fullWidth
          shadow="md"
          className="group bg-secondary-background"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardHeader className="flex content-center justify-center">
            <div className="relative inline-block">
              {isHovered && <Icon icon="line-md:play-filled" width="64" height="64" className="absolute-center z-20 text-white" />}
              {movie.adult && (
                <Chip color="danger" size="sm" variant="flat" className="absolute left-5 top-5 z-20">
                  18+
                </Chip>
              )}
              <div className="relative overflow-hidden rounded-large">
                <Image
                  isBlurred
                  alt={movie.title}
                  className="aspect-[2/3] h-max max-h-max w-full rounded-lg object-cover object-center group-hover:scale-110"
                  src={posterImage}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-md truncate font-bold">
              {movie.title} ({releaseYear})
            </p>
          </CardBody>
          <CardFooter className="justify-between pt-0">
            <p className="text-sm">{releaseYear}</p>
            <Rating rate={movie?.vote_average} />
          </CardFooter>
        </Card>
      </Link>
    </Tooltip>
  );
};
