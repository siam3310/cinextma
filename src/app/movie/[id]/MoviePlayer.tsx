import IconButton from "@/components/ui/button/IconButton";
import { getMoviePlayers } from "@/utils/players";
import { getImageUrl, mutateMovieTitle } from "@/utils/movies";
import { Card, Image, Skeleton, Select, SelectItem, Tooltip } from "@heroui/react";
import { forwardRef, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa6";
import { IoIosRocket, IoMdHelpCircle } from "react-icons/io";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import { FaAd } from "react-icons/fa";
import AdsWarning from "@/components/ui/overlay/AdsWarning";

export interface MoviePlayerProps {
  movie: MovieDetails;
}

const MoviePlayer = forwardRef<HTMLDivElement, MoviePlayerProps>(({ movie }, ref) => {
  const players = getMoviePlayers(movie.id);
  const title = mutateMovieTitle(movie);
  const [warning, setWarning] = useState(false);
  const [playMovie, setPlayMovie] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>(players[0].title);
  const backdropImage = getImageUrl(movie.backdrop_path, "backdrop", true);

  const handlePlay = () => {
    if (localStorage.getItem("ads-warning-seen")) {
      setPlayMovie(true);
    } else {
      setWarning(true);
    }
  };

  const Placeholder = () => (
    <Card shadow="md" className="group aspect-video size-full">
      <Image
        isBlurred
        alt={title}
        className="size-full"
        classNames={{
          wrapper: "absolute-center aspect-video size-full group-hover:opacity-70 transition",
        }}
        src={backdropImage}
      />
      <IconButton
        icon={<FaPlay />}
        radius="full"
        tooltip={`Play ${title}`}
        className="absolute-center"
        color="warning"
        variant="faded"
        size="lg"
        onPress={handlePlay}
      />
    </Card>
  );

  const PlayerTabs = () =>
    players.map(
      ({ title, source }) =>
        selectedSource === title && (
          <Card key={title} shadow="md" className="relative">
            <Skeleton className="absolute aspect-video size-full" />
            <iframe className="z-10 aspect-video size-full" src={source} allowFullScreen />
          </Card>
        ),
    );

  const SourceSelection = () => (
    <div className="flex items-center justify-center gap-2">
      <Select
        disallowEmptySelection
        selectionMode="single"
        size="sm"
        label="Selected Source"
        placeholder="Select source"
        className="max-w-xs"
        defaultSelectedKeys={[selectedSource]}
        selectedKeys={[selectedSource]}
        onChange={({ target }) => setSelectedSource(target.value)}
      >
        {players.map(({ title, recommended, fast, ads }) => (
          <SelectItem key={title} textValue={title}>
            <div className="flex items-center space-x-2">
              <span>{title}</span>
              {recommended && <FaStar className="text-warning-500" />}
              {fast && <IoIosRocket className="text-danger-500" />}
              {ads && <FaAd className="text-primary-500" />}
            </div>
          </SelectItem>
        ))}
      </Select>
      <Tooltip
        content={
          <div className="space-y-2 px-1 py-2">
            <div className="flex items-center gap-2">
              <FaStar className="text-warning-500" />
              <span>Recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <IoIosRocket className="text-danger-500" />
              <span>Fast hosting</span>
            </div>
            <div className="flex items-center gap-2">
              <FaAd className="text-primary-500" />
              <span>May contain popup ads</span>
            </div>
          </div>
        }
        placement="right"
        showArrow
      >
        <div>
          <IoMdHelpCircle size={24} className="cursor-help" />
        </div>
      </Tooltip>
    </div>
  );

  return (
    <section id="movie-player" ref={ref} className="z-[3] aspect-video size-auto">
      {playMovie ? (
        <div className="space-y-5">
          <PlayerTabs />
          <SourceSelection />
        </div>
      ) : (
        <Placeholder />
      )}
      {warning && <AdsWarning />}
    </section>
  );
});

MoviePlayer.displayName = "MoviePlayer";

export default MoviePlayer;
