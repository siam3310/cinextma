"use client";

import { Image, Chip, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { IconButton } from "@/components/ui/button/IconButton";
import { movieDurationString } from "@/lib/utils";
import LikeButton from "@/components/ui/button/LikeButton";
import BookmarkButton from "@/components/ui/button/BookmarkButton";
import VaulDrawer from "@/components/ui/overlay/VaulDrawer";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import Rating from "../../../components/movies/Rating";

export const OverviewSection: React.FC<{
  movie: MovieDetails;
}> = ({ movie }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL + (movie.poster_path ?? "");
  const genre = movie.genres.map((item) => item.name).join(" • ");

  return (
    <section id="overview" className="relative z-[3] flex flex-col gap-8 pt-[20vh] md:pt-[40vh]">
      <div className="md:grid md:grid-cols-[auto,1fr] md:gap-6">
        <Image
          isBlurred
          shadow="md"
          alt={movie.title}
          classNames={{
            wrapper: "w-52 max-h-min aspect-[2/3] hidden md:block",
          }}
          className="object-cover object-center"
          src={posterImage}
        />

        <div className="flex flex-col gap-8">
          <div id="title" className="flex flex-col gap-1 md:gap-2">
            <div className="flex gap-3">
              <Chip color="warning" variant="faded" className="md:text-md text-xs">
                Movie
              </Chip>
              {movie.adult && (
                <Chip color="danger" variant="faded">
                  18+
                </Chip>
              )}
            </div>
            <h2 className="text-2xl font-black md:text-4xl">
              {movie.title} ({releaseYear})
            </h2>
            <div className="md:text-md flex flex-wrap gap-1 text-xs md:gap-2">
              <p>{movieDurationString(movie.runtime)}</p>
              <p>|</p>
              <p>{releaseYear}</p>
              <p>|</p>
              <p>{genre}</p>
              <p>|</p>
              <Rating rate={movie.vote_average} />
            </div>
          </div>

          <div id="action" className="flex w-full flex-col flex-wrap justify-between gap-4 md:flex-row md:gap-0">
            <div className="flex flex-wrap gap-2">
              <Button color="primary" variant="shadow" startContent={<Icon icon="solar:play-circle-bold" fontSize={24} />}>
                Play Now
              </Button>
              <Button color="danger" variant="shadow" startContent={<Icon icon="mdi:youtube" fontSize={24} />}>
                Trailer
              </Button>
              <BookmarkButton />
            </div>
            <div className="flex flex-wrap gap-2">
              <VaulDrawer trigger="Open">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum accusamus asperiores voluptatibus vitae alias molestiae quibusdam
                placeat quaerat pariatur, dolores error laborum aspernatur itaque temporibus suscipit? Ullam, sed harum?
              </VaulDrawer>
              <IconButton iconName="mdi:download" variant="ghost" tooltip="Download" />
              <IconButton iconName="mdi:share" variant="ghost" tooltip="Share" />
              <LikeButton title={movie.title} />
            </div>
          </div>

          <div id="story" className="flex flex-col gap-2">
            <h4 className="text-xl font-bold">Story Line</h4>
            <p className="text-sm">{movie.overview}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
