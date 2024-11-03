import { DiscoverPosterCard } from "@/app/discover/DiscoverPosterCard";
import { SkeletonDiscoverPosterCard } from "@/app/discover/SkeletonDiscoverPosterCard";
import { Skeleton } from "@nextui-org/react";
import { Movie } from "tmdb-ts";

interface SearchResultsProps {
  isLoading: boolean;
  totalResults: number;
  movies: Movie[];
  query: string;
}

export default function SearchResults({ isLoading, totalResults, movies, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-8 w-[50vh] max-w-[90%] rounded-full" />
        <div className="movie-grid">
          {Array.from({ length: 20 }, (_, index) => (
            <SkeletonDiscoverPosterCard key={index} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="text-center text-xl">
        Found <span className="font-bold text-primary">{totalResults.toLocaleString()}</span> movies with query{" "}
        <span className="font-bold text-warning">"{query}"</span>
      </h4>
      <div className="movie-grid">
        {movies.map((movie) => (
          <DiscoverPosterCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
