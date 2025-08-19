import { Image, Chip, Button, Spinner, Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { cn, isEmpty } from "@/utils/helpers";
import { tmdb } from "@/api/tmdb";
import Rating from "../../ui/other/Rating";
import { useElementSize } from "@mantine/hooks";
import { getImageUrl, mutateTvShowTitle } from "@/utils/movies";
import Genres from "@/components/ui/other/Genres";
import { Calendar, Play } from "@/utils/icons";

const TvShowHoverCard: React.FC<{ id: number; fullWidth?: boolean }> = ({ id, fullWidth }) => {
  const { ref, width, height } = useElementSize();
  const { data: tv, isPending } = useQuery({
    queryFn: () => tmdb.tvShows.details(id, ["images"]),
    queryKey: ["get-tv-detail-on-hover-poster", id],
  });

  if (isPending) {
    return (
      <div className="h-96 w-80">
        <Spinner size="lg" color="warning" variant="simple" className="absolute-center" />
      </div>
    );
  }

  if (!tv) return null;

  const title = mutateTvShowTitle(tv);
  const releaseYear = new Date(tv.first_air_date).getFullYear();
  const fullTitle = `${title} (${releaseYear})`;
  const backdropImage = getImageUrl(tv.backdrop_path, "backdrop");
  const paddingTop = width * (9 / 16) - height / 4;
  const titleImage = getImageUrl(
    tv.images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path,
    "title",
  );

  return (
    <div
      className={cn("w-80", {
        "w-full": fullWidth,
      })}
    >
      <div className="relative">
        <div ref={ref} className="absolute aspect-video h-fit w-full">
          <div className="absolute z-[2] h-full w-full bg-gradient-to-t from-secondary-background from-[1%]"></div>
          {!isEmpty(titleImage) && (
            <Image
              isBlurred
              radius="none"
              alt={fullTitle}
              classNames={{ wrapper: "absolute-center z-[1] bg-transparent" }}
              className="h-full max-h-32 w-full drop-shadow-xl"
              src={titleImage}
            />
          )}
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
          <Chip color="warning" size="sm" variant="faded" className="md:text-md text-xs">
            TV
          </Chip>
          <h4 className="text-xl font-bold">{fullTitle}</h4>
          <div className="md:text-md flex flex-wrap gap-1 text-xs *:z-10">
            <div className="flex items-center gap-1">
              <Calendar />
              <span>{releaseYear}</span>
            </div>
            <p>|</p>
            <Rating rate={tv.vote_average} />
          </div>
          <Genres genres={tv.genres} type="tv" />
          <div className="flex w-full justify-between gap-2 py-1">
            <Button
              as={Link}
              href={`/tv/${tv.id}`}
              fullWidth
              color="warning"
              variant="shadow"
              startContent={<Play size={24} />}
            >
              Play Now
            </Button>
            {/* <BookmarkButton movie={tv} isTooltipDisabled /> */}
          </div>
          <p className="text-sm">{tv.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TvShowHoverCard;
