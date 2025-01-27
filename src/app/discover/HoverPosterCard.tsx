import { Image, Chip, Button, Spinner, Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/utils/helpers";
import { Icon } from "@iconify/react";
import BookmarkButton from "@/components/ui/button/BookmarkButton";
import { tmdb } from "@/api/tmdb";
import Rating from "../../components/movies/Rating";
import { useElementSize } from "@mantine/hooks";
import { getImageUrl, movieDurationString, mutateMovieTitle } from "@/utils/movies";
import Genres from "@/components/movies/Genres";
import { Genre } from "tmdb-ts";

export const HoverPosterCard: React.FC<{ id: number; fullWidth?: boolean }> = ({
  id,
  fullWidth,
}) => {
  const { ref, width, height } = useElementSize();
  const { data: movie, isPending } = useQuery({
    queryFn: () => tmdb.movies.details(id, ["images"]),
    queryKey: ["get-movie-detail-on-hover-poster", id],
  });

  const title = mutateMovieTitle(movie);
  const releaseYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : undefined;
  const fullTitle = `${title} (${releaseYear})`;
  const backdropImage = getImageUrl(movie?.backdrop_path, "backdrop");
  const titleImage = getImageUrl(
    movie?.images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path,
    "title",
  );
  const paddingTop = width * (9 / 16) - height / 4;

  return (
    <>
      <div
        className={cn("w-80", {
          "h-96": isPending,
          "w-full": fullWidth,
        })}
      >
        {isPending ? (
          <Spinner size="lg" className="absolute-center" />
        ) : (
          <div className="relative">
            <div ref={ref} className="absolute aspect-video h-fit w-full">
              <div className="absolute z-[2] h-full w-full bg-gradient-to-t from-secondary-background from-[1%]"></div>
              <Image
                isBlurred
                radius="none"
                alt={fullTitle}
                classNames={{ wrapper: "absolute-center z-[1] bg-transparent" }}
                className="h-full max-h-32 w-full drop-shadow-xl"
                src={titleImage}
              />
              <Image
                radius="none"
                alt={fullTitle}
                className="z-0 aspect-video rounded-t-lg object-cover object-center"
                src={backdropImage}
              />
            </div>
            <div
              className="flex flex-col gap-2 p-4 *:z-10"
              style={{ paddingTop: paddingTop === 0 ? 120 : paddingTop }}
            >
              <div className="flex gap-3">
                <Chip size="sm" color="warning" variant="faded" className="md:text-md text-xs">
                  Movie
                </Chip>
                {movie?.adult && (
                  <Chip size="sm" color="danger" variant="faded">
                    18+
                  </Chip>
                )}
              </div>
              <h4 className="text-xl font-bold">{fullTitle}</h4>
              <div className="md:text-md flex flex-wrap gap-1 text-xs *:z-10">
                <p>{movieDurationString(movie?.runtime)}</p>
                <p>|</p>
                <p>{releaseYear}</p>
                <p>|</p>
                <Rating rate={movie?.vote_average} />
              </div>
              <Genres genres={movie?.genres as Genre[]} />
              <div className="flex w-full justify-between gap-2 py-1">
                <Button
                  as={Link}
                  href={`/movie/${movie?.id}`}
                  fullWidth
                  color="primary"
                  variant="shadow"
                  startContent={<Icon icon="solar:play-circle-bold" fontSize={24} />}
                >
                  Play Now
                </Button>
                {/* @ts-expect-error no error */}
                <BookmarkButton movie={movie} isTooltipDisabled />
              </div>
              <p className="text-sm">{movie?.overview}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
