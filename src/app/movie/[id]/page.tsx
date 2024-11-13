"use client";

import MoviePlayer from "@/app/movie/[id]/MoviePlayer";
import { OverviewSection } from "@/app/movie/[id]/OverviewSection";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/api/tmdb";
import CastsSection from "@/app/movie/[id]/CastsSection";
import BackdropSection from "@/app/movie/[id]/BackdropSection";
import RelatedSection from "./RelatedSection";
import { Cast } from "tmdb-ts/dist/types/credits";
import { notFound } from "next/navigation";

export default function MovieDetailPage({ params }: { params: { id: number } }) {
  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      tmdb.movies.details(params.id, ["images", "videos", "credits", "keywords", "recommendations", "similar", "reviews", "watch/providers"]),
    queryKey: ["movie-detail", params.id],
  });

  if (error) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      {isPending ? (
        <Spinner size="lg" className="absolute-center" />
      ) : (
        <div className="flex flex-col gap-10">
          <BackdropSection movie={movie} />
          <OverviewSection movie={movie} />
          <CastsSection casts={movie?.credits.cast as Cast[]} />
          <MoviePlayer movie={movie} />
          <RelatedSection movie={movie} />
        </div>
      )}
    </div>
  );
}
