"use client";

import { useLocalStorage } from "@mantine/hooks";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState, useMemo, Suspense } from "react";
import { isEmpty } from "@/utils/helpers";
import { SavedMovieDetails } from "@/types/movie";
import { Trash } from "@/utils/icons";
import ContentTypeSelection from "@/components/ui/other/ContentTypeSelection";
import useDiscoverFilters from "@/hooks/useDiscoverFilters";
import MoviePosterCard from "../Movie/Cards/Poster";
import TvShowPosterCard from "../TV/Cards/Poster";

type SortOption = "title" | "release_date" | "vote_average" | "saved_date";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "release_date", label: "Release Date" },
  { key: "vote_average", label: "Rating" },
  { key: "saved_date", label: "Saved Date" },
];

const LibraryList = () => {
  const { content } = useDiscoverFilters();
  const [savedMovies, setSavedMovies] = useLocalStorage<SavedMovieDetails[]>({
    key: "bookmarks",
    defaultValue: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>("title");

  const filteredMovies = useMemo(() => {
    return [...savedMovies]
      .filter((movie) => movie.type === content)
      .sort((a, b) => {
        if (sortOption === "vote_average" || sortOption === "release_date") {
          return b[sortOption] > a[sortOption] ? 1 : -1;
        } else {
          return (
            a[sortOption as keyof SavedMovieDetails]
              ?.toString()
              .localeCompare(b[sortOption as keyof SavedMovieDetails]?.toString() ?? "") || 0
          );
        }
      });
  }, [savedMovies, sortOption, content]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <ContentTypeSelection className="justify-center" />
        <Select
          label="Sort"
          size="sm"
          placeholder="Select sort"
          className="max-w-xs p-4"
          defaultSelectedKeys={["title"]}
          onChange={({ target }) => setSortOption(target.value as SortOption)}
        >
          {SORT_OPTIONS.map(({ key, label }) => (
            <SelectItem key={key}>{label}</SelectItem>
          ))}
        </Select>
        {!isEmpty(filteredMovies) && (
          <Button
            startContent={<Trash />}
            color="danger"
            variant="shadow"
            onPress={() => setSavedMovies(savedMovies.filter((movie) => movie.type !== content))}
          >
            Clear {content === "movie" ? "Movies" : "TV Series"} Library
          </Button>
        )}
      </div>

      {!isEmpty(filteredMovies) ? (
        <div className="movie-grid">
          {filteredMovies.map((data) => {
            if (data.type === "tv")
              return (
                <Suspense>
                  <TvShowPosterCard
                    key={data.id}
                    variant="bordered"
                    // @ts-expect-error: The expected type comes from property 'tv' which is declared here on type 'IntrinsicAttributes & TvShowPosterCardProps'
                    tv={{
                      adult: data.adult,
                      backdrop_path: data.backdrop_path,
                      first_air_date: data.release_date,
                      id: data.id,
                      name: data.title,
                      poster_path: data.poster_path!,
                      vote_average: data.vote_average,
                    }}
                  />
                </Suspense>
              );
            return (
              <Suspense>
                <MoviePosterCard
                  key={data.id}
                  variant="bordered"
                  // @ts-expect-error: The expected type comes from property 'movie' which is declared here on type 'IntrinsicAttributes & MoviePosterCardProps'
                  movie={{
                    adult: data.adult,
                    backdrop_path: data.backdrop_path,
                    id: data.id,
                    poster_path: data.poster_path!,
                    release_date: data.release_date,
                    title: data.title,
                    vote_average: data.vote_average,
                  }}
                />
              </Suspense>
            );
          })}
        </div>
      ) : (
        <p>No {content === "movie" ? "movies" : "TV series"} saved in your library.</p>
      )}
    </div>
  );
};

export default LibraryList;
