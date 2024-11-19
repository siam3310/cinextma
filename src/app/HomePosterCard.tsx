import { Image, Chip, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Rating from "@/components/movies/Rating";
import { HoverPosterCard } from "./discover/HoverPosterCard";
import { useHover } from "@mantine/hooks";
import { Movie } from "tmdb-ts/dist/types";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

const HomePosterCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { hovered, ref } = useHover();
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = getImageUrl(movie.poster_path);

  return (
    <Tooltip showArrow className="hidden p-0 md:block" shadow="lg" delay={1000} placement="right-start" content={<HoverPosterCard id={movie.id} />}>
      <Link href={`/movie/${movie.id}`}>
        <div ref={ref} className="group motion-preset-expand relative aspect-[2/3] size-fit overflow-hidden rounded-lg text-white">
          {hovered && <Icon icon="line-md:play-filled" width="64" height="64" className="absolute-center z-20 text-white" />}
          {movie.adult && (
            <Chip color="danger" size="sm" variant="flat" className="absolute left-2 top-2 z-20">
              18+
            </Chip>
          )}
          <div className="absolute bottom-0 z-[2] h-1/2 w-full bg-gradient-to-t from-black from-[1%]"></div>
          <div className="absolute bottom-0 z-[3] flex w-full flex-col gap-1 px-4 py-3">
            <h6 className="truncate text-sm font-semibold">
              {movie.original_language === "id" ? movie.original_title : movie.title} ({releaseYear})
            </h6>
            <div className="flex justify-between text-xs">
              <p>{releaseYear}</p>
              <Rating rate={movie?.vote_average} />
            </div>
          </div>
          <Image
            alt={movie.original_language === "id" ? movie.original_title : movie.title}
            src={posterImage}
            radius="none"
            className="z-0 aspect-[2/3] max-h-[250px] object-cover object-center transition group-hover:scale-110 md:max-h-[300px]"
            classNames={{
              img: "group-hover:opacity-70",
            }}
          />
        </div>
      </Link>
    </Tooltip>
  );
};

export default HomePosterCard;
