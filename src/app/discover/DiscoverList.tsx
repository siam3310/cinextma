"use client";

import { useState } from "react";
import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { Button, Pagination, Select, SelectItem } from "@heroui/react";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import useFetchDiscoverMovies from "@/hooks/useFetchDiscoverMovies";
import { DISCOVER_MOVIES_VALID_QUERY_TYPES, DiscoverMoviesFetchQueryType } from "@/types/movie";
import { useQueryState, parseAsInteger, parseAsStringLiteral } from "nuqs";
import { Movie } from "tmdb-ts/dist/types";
import Loop from "@/components/ui/other/Loop";
import GenresSelect from "@/components/movies/GenresSelect";
import { tmdb } from "@/api/tmdb";
import { parseAsSet } from "@/utils/parsers";

export default function DiscoverList() {
  const [totalPages] = useState(100);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  if (page > totalPages) setPage(totalPages);
  const [genres, setGenres] = useQueryState("genres", parseAsSet.withDefault(new Set([])));
  const [queryType, setQueryType] = useQueryState(
    "type",
    parseAsStringLiteral(DISCOVER_MOVIES_VALID_QUERY_TYPES).withDefault("discover"),
  );
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

  const { data, isPending } = useFetchDiscoverMovies({
    page: page,
    type: queryType,
    genres: Array.from(genres)
      .filter((genre) => genre !== "")
      .join(","),
  });

  const movies = data?.results as Movie[];

  const totalResults = data?.total_results as number;

  const isEmpty = totalResults === 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleQueryTypeChange = (newType: DiscoverMoviesFetchQueryType) => {
    setQueryType(newType);
    setGenres(null);
    setPage(1);
  };

  const handleGenresChange = (newGenres: string) => {
    setQueryType("discover");
    setGenres(
      newGenres === "" ? null : new Set(newGenres.split(",").filter((genre) => genre !== "")),
    );
    setPage(1);
  };

  const handleResetFilters = () => {
    setQueryType("discover");
    setGenres(null);
    setPage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-wrap justify-center gap-3">
        <div className="flex w-full flex-wrap justify-center gap-3">
          <Select
            disallowEmptySelection
            selectionMode="single"
            size="sm"
            label="Type"
            placeholder="Select type"
            className="max-w-xs"
            isDisabled={isPending}
            isLoading={isPending}
            defaultSelectedKeys={[queryType]}
            selectedKeys={[queryType]}
            onChange={({ target }) =>
              handleQueryTypeChange(target.value as DiscoverMoviesFetchQueryType)
            }
            value={queryType}
          >
            {selectItems.map(({ key, name }) => {
              return <SelectItem key={key}>{name}</SelectItem>;
            })}
          </Select>
          <GenresSelect
            query={tmdb.genres.movies()}
            type="movie"
            selectedKeys={genres}
            isDisabled={isPending}
            onChange={({ target }) => handleGenresChange(target.value)}
          />
        </div>
        <Button size="sm" onPress={handleResetFilters} isDisabled={isPending}>
          Reset Filters
        </Button>
      </div>
      <>
        {!isEmpty && (
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
          <div className="movie-grid">
            <Loop count={20} prefix="SkeletonDiscoverPosterCard">
              <SkeletonDiscoverPosterCard />
            </Loop>
          </div>
        ) : !isEmpty ? (
          <div className="movie-grid">
            {movies?.map((movie) => {
              return <DiscoverPosterCard key={movie.id} movie={movie} />;
            })}
          </div>
        ) : (
          <p>No movie was found with applied filters.</p>
        )}
        {!isEmpty && (
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
    </div>
  );
}
