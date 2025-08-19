"use client";

import { siteConfig } from "@/config/site";
import { Movie, TV } from "@/utils/icons";
import { Spinner, Tab, Tabs } from "@heroui/react";
import dynamic from "next/dynamic";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { Suspense } from "react";
const HomeMovieList = dynamic(() => import("./HomeMovieList"));
const TvShowHomeList = dynamic(() => import("@/components/sections/TvShow/HomeList"));

const HomePage = () => {
  const { movies, tvShows } = siteConfig.queryLists;
  const [content, setContent] = useQueryState(
    "content",
    parseAsStringLiteral(["movie", "tv"]).withDefault("movie"),
  );

  return (
    <div className="flex flex-col">
      <Tabs
        aria-label="Content Types"
        color={content === "movie" ? "primary" : "warning"}
        size="lg"
        className="justify-center"
        selectedKey={content}
        variant="underlined"
        onSelectionChange={(value) => setContent(value === "movie" ? "movie" : "tv")}
        classNames={{
          tabContent: "pb-2",
          cursor: "h-1 rounded-full",
        }}
      >
        <Tab
          key="movie"
          title={
            <div className="flex items-center space-x-2">
              <Movie />
              <span>Movie</span>
            </div>
          }
        >
          <Suspense fallback={<Spinner size="lg" className="absolute-center" variant="simple" />}>
            <div className="flex flex-col gap-12 pt-6">
              {movies.map(({ name, query, param }) => (
                <HomeMovieList key={name} name={name} query={query} param={param} />
              ))}
            </div>
          </Suspense>
        </Tab>
        <Tab
          key="tv"
          title={
            <div className="flex items-center space-x-2">
              <TV />
              <span>TV Shows</span>
            </div>
          }
        >
          <Suspense
            fallback={
              <Spinner size="lg" className="absolute-center" color="warning" variant="simple" />
            }
          >
            <div className="flex flex-col gap-12 pt-6">
              {tvShows.map(({ name, query, param }) => (
                <TvShowHomeList key={name} name={name} query={query} param={param} />
              ))}
            </div>
          </Suspense>
        </Tab>
      </Tabs>
    </div>
  );
};

export default HomePage;
