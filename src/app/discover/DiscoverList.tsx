"use client";

import { useState } from "react";
import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import useFetchDiscoverMovies from "@/hooks/useFetchDiscoverMovies";
import { DISCOVER_MOVIES_VALID_QUERY_TYPES, DiscoverMoviesFetchQueryType } from "@/types/movie";
import { useQueryState, parseAsInteger, parseAsStringLiteral } from "nuqs";
import { Movie } from "tmdb-ts/dist/types";
import Loop from "@/components/ui/other/Loop";

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
  const [totalPages] = useState(100);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [queryType, setQueryType] = useQueryState("type", parseAsStringLiteral(DISCOVER_MOVIES_VALID_QUERY_TYPES).withDefault("discover"));

  const { data, isPending } = useFetchDiscoverMovies({ page: page, type: queryType });

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
          {selectItems.map(({ key, name }) => {
            return (
              <SelectItem key={key} value={key}>
                {name}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      <>
        <Pagination showControls total={totalPages} page={page} initialPage={page} onChange={handlePageChange} />
        {isPending ? (
          <div className="movie-grid">
            <Loop count={20} prefix="SkeletonDiscoverPosterCard">
              <SkeletonDiscoverPosterCard />
            </Loop>
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
