"use client";

import { useState, useEffect, useRef } from "react";
import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { InternalForwardRefRenderFunction, Pagination, Select, SelectItem } from "@nextui-org/react";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import useFetchDiscoverMovies from "@/hooks/useFetchDiscoverMovies";
import { DISCOVER_MOVIES_VALID_QUERY_TYPES, DiscoverMoviesFetchQueryType } from "@/types/movie";
import { useQueryState, parseAsInteger, parseAsStringLiteral } from "nuqs";
import { Movie } from "tmdb-ts/dist/types";

const selectItems = [
  {
    name: "Discover",
    key: "discover",
  },
  {
    name: "Today's Trending",
    key: "todayTrending",
  },
  {
    name: "This Week's Trending",
    key: "thisWeekTrending",
  },
  {
    name: "Popular",
    key: "popular",
  },
  {
    name: "Now Playing",
    key: "nowPlaying",
  },
  {
    name: "Upcoming",
    key: "upcoming",
  },
  {
    name: "Top Rated",
    key: "topRated",
  },
];

export default function DiscoverList() {
  const [totalPages, setTotalPages] = useState(100);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [queryType, setQueryType] = useQueryState("type", parseAsStringLiteral(DISCOVER_MOVIES_VALID_QUERY_TYPES).withDefault("discover"));

  const { data, isPending } = useFetchDiscoverMovies({ page: page, type: queryType });

  // useEffect(() => {
  //   setTotalPages(data?.total_pages ?? totalPages);
  // }, [data?.total_pages, totalPages]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleQueryTypeChange = (newType: DiscoverMoviesFetchQueryType) => {
    setQueryType(newType);
    setPage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-wrap justify-center gap-3">
        <Select
          selectionMode="single"
          label="Type"
          placeholder="Select type"
          className="max-w-xs"
          defaultSelectedKeys={[queryType]}
          onChange={({ target }) => handleQueryTypeChange(target.value as DiscoverMoviesFetchQueryType)}
          value={queryType}
        >
          {selectItems.map((select) => {
            return (
              <SelectItem key={select.key} value={select.key}>
                {select.name}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      <>
        <Pagination showControls total={totalPages} page={page} initialPage={page} onChange={handlePageChange} />
        {isPending ? (
          <div className="movie-grid">
            {Array.from({ length: 20 }, (_, index) => (
              <SkeletonDiscoverPosterCard key={index} />
            ))}
          </div>
        ) : (
          <div className="movie-grid">
            {data?.results.map((movie: Movie) => {
              return <DiscoverPosterCard key={movie.id} movie={movie} />;
            })}
          </div>
        )}
        <Pagination showControls total={totalPages} page={page} initialPage={page} onChange={handlePageChange} />
      </>
    </div>
  );
}
