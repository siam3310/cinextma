"use client";

import { use } from "react";
import MoviePlayer from "@/app/movie/[id]/MoviePlayer";
import { OverviewSection } from "@/app/movie/[id]/OverviewSection";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/api/tmdb";
import CastsSection from "@/app/movie/[id]/CastsSection";
import BackdropSection from "@/app/movie/[id]/BackdropSection";
import RelatedSection from "./RelatedSection";
import { Cast } from "tmdb-ts/dist/types/credits";
import { notFound } from "next/navigation";
import GallerySection from "./GallerySection";
import { Image } from "tmdb-ts";
import { useScrollIntoView } from "@mantine/hooks";

export default function MovieDetailPage(props: { params: Promise<{ id: number }> }) {
  const params = use(props.params);
  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      tmdb.movies.details(params.id, [
        "images",
        "videos",
        "credits",
        "keywords",
        "recommendations",
        "similar",
        "reviews",
        "watch/providers",
      ]),
    queryKey: ["movie-detail", params.id],
  });

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 500,
  });

  if (error) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      {isPending ? (
        <Spinner size="lg" className="absolute-center" />
      ) : (
        <div className="flex flex-col gap-10">
          <BackdropSection movie={movie} />
          <OverviewSection
            onPlayNowClick={() => scrollIntoView({ alignment: "center" })}
            movie={movie}
          />
          <CastsSection casts={movie?.credits.cast as Cast[]} />
          <GallerySection images={movie?.images.backdrops as Image[]} />
          <MoviePlayer ref={targetRef} movie={movie} />
          <RelatedSection movie={movie} />
        </div>
      )}
    </div>
  );
}
