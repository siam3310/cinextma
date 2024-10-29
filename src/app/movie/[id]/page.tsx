"use client";

import MoviePlayer from "@/app/movie/[id]/MoviePlayer";
import { OverviewSection } from "@/app/movie/[id]/OverviewSection";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/api/tmdb";
import CastsSection from "@/app/movie/[id]/CastsSection";
import BackdropSection from "@/app/movie/[id]/BackdropSection";

export default function MovieDetailPage({ params }: { params: { id: number } }) {
  const { data: movie, isPending } = useQuery({
    queryFn: () => tmdb.movies.details(params.id, ["images", "videos", "credits"]),
    queryKey: ["discover-movies", params.id],
  });

  if (!isPending) console.log(movie);

  return (
    <div className="mx-auto max-w-6xl">
      {isPending ? (
        <Spinner size="lg" className="absolute-center" />
      ) : (
        <div className="flex flex-col gap-5">
          {/* @ts-expect-error this variable is not undefined */}
          <BackdropSection movie={movie} />
          {/* @ts-expect-error this variable is not undefined */}
          <OverviewSection movie={movie} />
          <CastsSection casts={movie?.credits.cast} />
          <MoviePlayer id={movie?.id} />
        </div>
      )}
    </div>
  );
}
