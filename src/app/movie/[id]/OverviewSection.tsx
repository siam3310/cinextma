"use client";

import { Image, Chip, Button } from "@nextui-org/react";
import { IconButton } from "@/components/ui/button/IconButton";
import { getImageUrl, movieDurationString, mutateMovieTitle } from "@/lib/utils";
import LikeButton from "@/components/ui/button/LikeButton";
import BookmarkButton from "@/components/ui/button/BookmarkButton";
import VaulDrawer from "@/components/ui/overlay/VaulDrawer";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import Rating from "../../../components/movies/Rating";
import ShareButton from "@/components/ui/button/ShareButton";
import { AppendToResponse } from "tmdb-ts/dist/types/options";
import Trailer from "./Trailer";
import { useDocumentTitle } from "@mantine/hooks";
import { siteConfig } from "@/config/site";
import { FaCirclePlay } from "react-icons/fa6";

export const OverviewSection: React.FC<{
  movie: AppendToResponse<MovieDetails, "videos"[], "movie">;
}> = ({ movie }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = getImageUrl(movie.poster_path);
  const genres = movie.genres.map((item) => item.name).join(" • ");
  const title = mutateMovieTitle(movie);
  const fullTitle = `${title} (${releaseYear})`;

  useDocumentTitle(`${fullTitle} | ${siteConfig.name}`);

  return (
    <section id="overview" className="relative z-[3] flex flex-col gap-8 pt-[20vh] md:pt-[40vh]">
      <div className="md:grid md:grid-cols-[auto,1fr] md:gap-6">
        <Image
          isBlurred
          shadow="md"
          alt={title}
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
            <h2 className="text-2xl font-black md:text-4xl">{title}</h2>
            <div className="md:text-md flex flex-wrap gap-1 text-xs md:gap-2">
              <p>{movieDurationString(movie.runtime)}</p>
              <p>|</p>
              <p>{releaseYear}</p>
              <p>|</p>
              <p>{genres}</p>
              <p>|</p>
              <Rating rate={movie.vote_average} />
            </div>
          </div>

          <div id="action" className="flex w-full flex-col flex-wrap justify-between gap-4 md:flex-row md:gap-0">
            <div className="flex flex-wrap gap-2">
              <Button color="primary" as="a" href="#movie-player" variant="shadow" startContent={<FaCirclePlay size={22} />}>
                Play Now
              </Button>
              <Trailer videos={movie.videos.results} />
            </div>
            <div className="flex flex-wrap gap-2">
              <ShareButton id={movie.id} title={title} />
              {/* @ts-expect-error no need saved_date because it processed in this component */}
              <BookmarkButton movie={movie} />
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
