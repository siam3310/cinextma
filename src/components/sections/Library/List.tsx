"use client";

import { useLocalStorage } from "@mantine/hooks";
import { Select, SelectItem } from "@heroui/react";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Movie } from "tmdb-ts/dist/types";
import MoviePosterCard from "@/components/sections/Movie/Cards/Poster";
import { isEmpty } from "@/utils/helpers";

const sortOptions = [
  { key: "title", label: "Title" },
  { key: "release_date", label: "Release Date" },
  { key: "vote_average", label: "Rating" },
  { key: "saved_date", label: "Saved Date" },
];

export default function LibraryList() {
  const [value] = useLocalStorage<string[]>({
    key: "bookmarks",
    defaultValue: [],
  });

  const savedMovies: Movie[] = value.map((movieString) => JSON.parse(movieString));
  const [sortOption, setSortOption] = useState<string>("title");

  const sortedMovies = useMemo(() => {
    return [...savedMovies].sort((a, b) => {
      if (sortOption === "vote_average" || sortOption === "release_date") {
        return b[sortOption] > a[sortOption] ? 1 : -1;
      } else {
        return a[sortOption as keyof Movie]
          ?.toString()
          .localeCompare(b[sortOption as keyof Movie]?.toString() ?? "");
      }
    });
  }, [savedMovies, sortOption]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Select
        label="Sort"
        size="sm"
        placeholder="Select sort"
        className="max-w-xs p-4"
        defaultSelectedKeys={["title"]}
        onChange={(e) => setSortOption(e.target.value)}
      >
        {sortOptions.map(({ key, label }) => (
          <SelectItem key={key}>{label}</SelectItem>
        ))}
      </Select>

      {!isEmpty(savedMovies) ? (
        <AnimatePresence>
          <div className="movie-grid">
            {sortedMovies.map((movie) => (
              <MoviePosterCard key={movie.id} movie={movie} variant="bordered" />
            ))}
          </div>
        </AnimatePresence>
      ) : (
        <p>No movies saved in your library.</p>
      )}
    </div>
  );
}
