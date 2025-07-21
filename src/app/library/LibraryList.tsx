"use client";

import { useLocalStorage } from "@mantine/hooks";
import { DiscoverPosterCard } from "../discover/DiscoverPosterCard";
import { Select, SelectItem } from "@heroui/react";
import { useState, useMemo } from "react"; // Import framer-motion
import { AnimatePresence } from "framer-motion";
import { Movie } from "tmdb-ts/dist/types";

export default function LibraryList() {
  const [value] = useLocalStorage<string[]>({
    key: "bookmarks",
    defaultValue: [],
  });

  // const savedMovies: SavedMovieDetails[] = value.map((movieString) => JSON.parse(movieString));
  const savedMovies: Movie[] = value.map((movieString) => JSON.parse(movieString));
  const [sortOption, setSortOption] = useState<string>("title");

  const sortedMovies = useMemo(() => {
    return [...savedMovies].sort((a, b) => {
      if (sortOption === "vote_average" || sortOption === "release_date") {
        return b[sortOption] > a[sortOption] ? 1 : -1;
      } else {
        // @ts-expect-error it's working, why not?
        return a[sortOption]?.localeCompare(b[sortOption]);
      }
    });
  }, [savedMovies, sortOption]);

  const notEmpty = savedMovies.length > 0;
  const sortOptions = [
    { key: "title", label: "Title" },
    { key: "release_date", label: "Release Date" },
    { key: "vote_average", label: "Rating" },
    { key: "saved_date", label: "Saved Date" },
  ];

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

      {notEmpty ? (
        <AnimatePresence>
          <div className="movie-grid">
            {sortedMovies.map((movie) => (
              <DiscoverPosterCard key={movie.id} movie={movie} />
            ))}
          </div>
        </AnimatePresence>
      ) : (
        <p>No movies saved in your library.</p>
      )}
    </div>
  );
}
