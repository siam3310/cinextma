"use client";

import { useState, useEffect } from "react";
import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import useFetchDiscoverMovies from "@/hooks/useFetchDiscoverMovies";
import { isValidQueryType } from "@/lib/utils";
import { DiscoverMoviesFetchQueryType } from "@/types/movie";

export default function DiscoverList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");
  const typeQuery = searchParams.get("type");

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState<number>(typeof pageQuery === "string" && !isNaN(parseInt(pageQuery)) ? parseInt(pageQuery) : 1);
  const [queryType, setQueryType] = useState<DiscoverMoviesFetchQueryType>(() => {
    if (isValidQueryType(typeQuery)) {
      return typeQuery;
    }

    if (typeQuery !== null) {
      setTimeout(() => {
        router.push(`?type=discover${pageQuery ? `&page=${pageQuery}` : ""}`);
      }, 0);
    }

    return "discover";
  });

  const { data, isPending } = useFetchDiscoverMovies({ page: page, type: queryType });

  useEffect(() => {
    if (totalPages === 0) {
      setTotalPages(data?.total_pages ?? 0);
    }
  }, [data?.total_pages, totalPages]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?type=${queryType}&page=${newPage}`);
  };

  const handleQueryTypeChange = (newType: string) => {
    if (isValidQueryType(newType)) {
      setQueryType(newType);
      setPage(1);
      router.push(`?type=${newType}`);
    } else {
      setQueryType("discover");
      setPage(1);
      router.push(`?type=discover`);
    }
  };

  if (!isPending) console.log(data);

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="flex w-full flex-wrap justify-center gap-3">
        <Select
          selectionMode="single"
          label="Type"
          placeholder="Select type"
          className="max-w-xs"
          defaultSelectedKeys={[queryType]}
          onChange={(e) => handleQueryTypeChange(e.target.value)}
          value={queryType}
        >
          <SelectItem key="discover" value="discover">
            Discover
          </SelectItem>
          <SelectItem key="todayTrending" value="todayTrending">
            Today's Trending
          </SelectItem>
          <SelectItem key="thisWeekTrending" value="thisWeekTrending">
            This Week's Trending
          </SelectItem>
          <SelectItem key="popular" value="popular">
            Popular
          </SelectItem>
          <SelectItem key="nowPlaying" value="nowPlaying">
            Now Playing
          </SelectItem>
          <SelectItem key="upcoming" value="upcoming">
            Upcoming
          </SelectItem>
          <SelectItem key="topRated" value="topRated">
            Top Rated
          </SelectItem>
        </Select>
      </div>
      <>
        <Pagination showControls total={totalPages} initialPage={page} onChange={handlePageChange} />
        {isPending ? (
          <div className="movie-grid">
            {Array.from({ length: 20 }, (_, index) => (
              <SkeletonDiscoverPosterCard key={index} />
            ))}
          </div>
        ) : (
          <div className="movie-grid">
            {data?.results.map((movie: any, index) => {
              return <DiscoverPosterCard key={movie.id} movie={movie} />;
            })}
          </div>
        )}
      </>
      <Pagination showControls total={totalPages} initialPage={page} onChange={handlePageChange} />
    </div>
  );
}
