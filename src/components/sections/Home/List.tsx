"use client";

import ContentTypeSelection from "@/components/ui/other/ContentTypeSelection";
import { siteConfig } from "@/config/site";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import MovieHomeList from "../Movie/HomeList";
import TvShowHomeList from "../TV/HomeList";

const HomePageList: React.FC = () => {
  const { movies, tvShows } = siteConfig.queryLists;
  const [content] = useQueryState(
    "content",
    parseAsStringLiteral(["movie", "tv"]).withDefault("movie"),
  );

  return (
    <div className="flex flex-col gap-12">
      <ContentTypeSelection className="justify-center" />
      <div className="flex flex-col gap-12">
        {content === "movie" &&
          movies.map((movie) => <MovieHomeList key={movie.name} {...movie} />)}
        {content === "tv" && tvShows.map((tv) => <TvShowHomeList key={tv.name} {...tv} />)}
      </div>
    </div>
  );
};

export default HomePageList;
