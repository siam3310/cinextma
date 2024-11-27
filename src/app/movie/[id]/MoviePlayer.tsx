import IconButton from "@/components/ui/button/IconButton";
import { getMoviePlayers } from "@/lib/players";
import { getImageUrl, mutateMovieTitle } from "@/lib/utils";
import { Card, Tabs, Tab, Image, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { MovieDetails } from "tmdb-ts/dist/types/movies";

const MoviePlayer: React.FC<{ movie: MovieDetails }> = ({ movie }) => {
  const [playMovie, setPlayMovie] = useState(false);
  const backdropImage = getImageUrl(movie.backdrop_path, "backdrop", true);
  const title = mutateMovieTitle(movie);
  const players = getMoviePlayers(movie.id);

  return (
    <section id="movie-player" className="aspect-video size-auto">
      {playMovie ? (
        <Tabs size="md" radius="full" aria-label="Movie Player" placement="bottom" color="primary" className="z-[3]" classNames={{ base: "flex justify-center" }}>
          {players.map(({ title, source }) => (
            <Tab key={title} title={title}>
              <Card shadow="md" className="relative">
                <Skeleton className="absolute aspect-video size-full" />
                <iframe className="z-10 aspect-video size-full" src={source} allowFullScreen />
              </Card>
            </Tab>
          ))}
        </Tabs>
      ) : (
        <Card shadow="md" className="group aspect-video size-full">
          <Image isBlurred alt={title} className="size-full" classNames={{ wrapper: "absolute-center aspect-video size-full group-hover:opacity-70 transition" }} src={backdropImage} />
          <IconButton icon={<FaPlay />} radius="full" tooltip={`Play ${title}`} className="absolute-center" color="warning" variant="faded" size="lg" onPress={() => setPlayMovie(true)}></IconButton>
        </Card>
      )}
    </section>
  );
};

export default MoviePlayer;
