import { IconButton } from "@/components/ui/button/IconButton";
import { Card, Tabs, Tab, Image } from "@nextui-org/react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { MovieDetails } from "tmdb-ts/dist/types/movies";

const MoviePlayer: React.FC<{ movie: MovieDetails }> = ({ movie }) => {
  const [playMovie, setPlayMovie] = useState(false);
  const backdropImage = process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL_OR + movie.backdrop_path;
  const id = movie.id;
  const players = [
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/movie/${id}`,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.to/embed/movie/${id}`,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    },
    {
      title: "NontonGo",
      source: `https://www.nontongo.win/embed/movie/${id}`,
    },
    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/movie/${id}`,
    },
  ];

  return (
    <section id="movie-player">
      {playMovie ? (
        <Tabs
          size="md"
          radius="full"
          aria-label="Movie Player"
          placement="bottom"
          color="primary"
          className="z-[3]"
          classNames={{ base: "flex justify-center" }}
        >
          {players.map((player) => (
            <Tab key={player.title} title={player.title}>
              <Card shadow="md">
                <iframe className="aspect-video size-full" src={player.source} frameBorder={0} allowFullScreen />
              </Card>
            </Tab>
          ))}
        </Tabs>
      ) : (
        <Card shadow="md" className="group aspect-video size-full">
          <Image
            isBlurred
            alt={movie.original_language === "id" ? movie.original_title : movie.title}
            classNames={{ wrapper: "absolute-center aspect-video size-full group-hover:opacity-70 transition" }}
            src={backdropImage}
          />
          <IconButton
            icon={<FaPlay />}
            radius="full"
            tooltip={`Play ${movie.original_language === "id" ? movie.original_title : movie.title}`}
            buttonClassName="absolute-center"
            color="warning"
            variant="faded"
            size="lg"
            onPress={() => setPlayMovie(true)}
          ></IconButton>
        </Card>
      )}
    </section>
  );
};

export default MoviePlayer;
