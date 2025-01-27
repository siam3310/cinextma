"use client";

import { useState, useEffect } from "react";
import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Skeleton } from "@heroui/react";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import { tmdb } from "@/api/tmdb";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import SearchInput from "@/components/ui/input/SearchInput";
import clsx from "clsx";
import History from "./History";
import Loop from "@/components/ui/other/Loop";
import { Movie } from "tmdb-ts/dist/types";

export default function SearchList() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString.withDefault(""));
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery.trim(), 1000);
  const [searchHistories, setSearchHistories] = useLocalStorage<string[]>({
    key: "search-histories",
    defaultValue: [],
    getInitialValueInEffect: false,
  });
  const { data, isPending } = useQuery({
    queryFn: () => tmdb.search.movies({ query: debouncedSearchQuery, page: page }),
    queryKey: ["search-movie", page, debouncedSearchQuery],
  });

  const movies = data?.results as Movie[];

  const totalResults = data?.total_results as number;

  useEffect(() => {
    setTotalPages(data?.total_pages ?? totalPages);
  }, [data?.total_pages]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearchTriggered(true);
      setPage(1);
      if (!searchHistories.includes(debouncedSearchQuery)) {
        setSearchHistories([...searchHistories, debouncedSearchQuery].sort());
      }
    } else {
      setIsSearchTriggered(false);
      setPage(1);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="flex flex-col items-center gap-8">
      <AnimatePresence>
        <div
          className={clsx("flex w-full max-w-xl flex-col justify-center gap-5 text-center", {
            "absolute-center px-3 md:px-0": !isSearchTriggered,
          })}
        >
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.7 }}
            exit={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SearchInput
              placeholder="Search your favorite movies..."
              isLoading={isPending && isSearchTriggered}
              autoFocus
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
            />
          </motion.div>
          <History
            searchHistories={searchHistories}
            setSearchQuery={setSearchQuery}
            setSearchHistories={setSearchHistories}
          />
        </div>
      </AnimatePresence>

      {isSearchTriggered && (
        <>
          {totalResults !== 0 && (
            <Pagination
              showControls
              isDisabled={isPending}
              total={totalPages}
              page={page}
              initialPage={page}
              onChange={handlePageChange}
            />
          )}
          {isPending ? (
            <>
              <Skeleton className="h-8 w-full max-w-xl rounded-full" />
              <div className="movie-grid">
                <Loop count={20} prefix="SkeletonDiscoverPosterCard">
                  <SkeletonDiscoverPosterCard />
                </Loop>
              </div>
            </>
          ) : (
            <>
              <h5 className="text-center text-xl">
                {totalResults !== 0 ? (
                  <span className="motion-preset-confetti">
                    Found{" "}
                    <span className="font-bold text-primary">{totalResults.toLocaleString()}</span>{" "}
                    movies with query{" "}
                    <span className="font-bold text-warning">"{debouncedSearchQuery}"</span>
                  </span>
                ) : (
                  <span>
                    No movie was found with query{" "}
                    <span className="font-bold text-warning">"{debouncedSearchQuery}"</span>
                  </span>
                )}
              </h5>
              {movies.length > 0 && (
                <>
                  <div className="movie-grid">
                    {movies.map((movie) => (
                      <DiscoverPosterCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {totalResults !== 0 && (
            <Pagination
              showControls
              isDisabled={isPending}
              total={totalPages}
              page={page}
              initialPage={page}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
