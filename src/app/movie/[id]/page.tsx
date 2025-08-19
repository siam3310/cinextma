"use client";

import { Suspense, use } from "react";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/api/tmdb";
import { Cast } from "tmdb-ts/dist/types/credits";
import { notFound } from "next/navigation";
import { Image } from "tmdb-ts";
import { useScrollIntoView } from "@mantine/hooks";
import dynamic from "next/dynamic";
const PhotosSection = dynamic(() => import("@/components/ui/other/PhotosSection"));
const BackdropSection = dynamic(() => import("@/app/movie/[id]/BackdropSection"));
const OverviewSection = dynamic(() => import("@/app/movie/[id]/OverviewSection"));
const CastsSection = dynamic(() => import("@/app/movie/[id]/CastsSection"));
const MoviePlayer = dynamic(() => import("@/app/movie/[id]/MoviePlayer"));
const RelatedSection = dynamic(() => import("@/app/movie/[id]/RelatedSection"));

export default function MovieDetailPage(props: { params: Promise<{ id: number }> }) {
  const { id } = use(props.params);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 500,
  });

  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      tmdb.movies.details(id, [
        "images",
        "videos",
        "credits",
        "keywords",
        "recommendations",
        "similar",
        "reviews",
        "watch/providers",
      ]),
    queryKey: ["movie-detail", id],
  });

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl">
        <Spinner size="lg" className="absolute-center" variant="simple" />
      </div>
    );
  }

  if (error) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Suspense fallback={<Spinner size="lg" className="absolute-center" variant="simple" />}>
        <div className="flex flex-col gap-10">
          <BackdropSection movie={movie} />
          <OverviewSection
            onPlayNowClick={() => scrollIntoView({ alignment: "center" })}
            movie={movie}
          />
          <CastsSection casts={movie.credits.cast as Cast[]} />
          <PhotosSection images={movie.images.backdrops as Image[]} />
          <MoviePlayer ref={targetRef} movie={movie} />
          <RelatedSection movie={movie} />
        </div>
      </Suspense>
    </div>
  );
}
