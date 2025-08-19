"use client";

import { tmdb } from "@/api/tmdb";
import { Params } from "@/types";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { use } from "react";
import dynamic from "next/dynamic";
const TvShowPlayer = dynamic(() => import("@/components/sections/TvShow/Details/Player"));

const TvShowPlayerPage: React.FC<Params<{ id: number; season: number; episode: number }>> = ({
  params,
}) => {
  const { id, season, episode } = use(params);

  const {
    data: tv,
    isPending: isPendingTv,
    error: errorTv,
  } = useQuery({
    queryFn: () => tmdb.tvShows.details(id),
    queryKey: ["tv-show-player-details", id],
  });

  const {
    data: seasonDetail,
    isPending: isPendingSeason,
    error: errorSeason,
  } = useQuery({
    queryFn: () => tmdb.tvShows.season(id, season),
    queryKey: ["tv-show-season", id, season],
  });

  if (isPendingTv || isPendingSeason) {
    return <Spinner size="lg" className="absolute-center" color="warning" variant="simple" />;
  }

  const EPISODE = seasonDetail?.episodes.find(
    (e) => e.episode_number.toString() === episode.toString(),
  );

  if (!EPISODE || errorTv || errorSeason) notFound();

  return (
    <TvShowPlayer id={id} seriesName={tv.name} seasonName={seasonDetail.name} episode={EPISODE} />
  );
};

export default TvShowPlayerPage;
