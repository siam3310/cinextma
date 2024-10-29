import { Image, Chip, Link, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { MovieDetails } from "tmdb-ts";
import Rating from "@/components/movies/Rating";
import { HoverPosterCard } from "./discover/HoverPosterCard";

const HomePosterCard: React.FC<{ movie: MovieDetails }> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL + (movie.poster_path ?? "");

  return (
    <Tooltip showArrow className="hidden p-0 md:block" shadow="lg" delay={1500} placement="right-start" content={<HoverPosterCard id={movie.id} />}>
      <Link href={`/movie/${movie.id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="relative overflow-hidden rounded-lg text-white">
          {isHovered && <Icon icon="line-md:play-filled" width="64" height="64" className="absolute-center z-20 text-white" />}
          {movie.adult && (
            <Chip color="danger" size="sm" variant="flat" className="absolute left-2 top-2 z-20">
              18+
            </Chip>
          )}
          <div className="absolute bottom-0 z-[2] h-[50%] w-full bg-gradient-to-t from-black from-[1%]"></div>
          <div className="absolute bottom-0 z-[3] flex w-full flex-col px-3 py-1">
            <h6 className="truncate text-sm font-semibold">
              {movie.title} ({releaseYear})
            </h6>
            <div className="flex justify-between text-xs">
              <p>{releaseYear}</p>
              <Rating rate={movie?.vote_average} />
            </div>
          </div>
          <Image alt={movie.title} src={posterImage} radius="none" className="z-0 max-h-[250px] object-cover object-center md:max-h-[300px]" />
        </div>
      </Link>
    </Tooltip>
  );
};

export default HomePosterCard;
