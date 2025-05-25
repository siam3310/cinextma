import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const HomeMovieList = dynamic(() => import("./HomeMovieList"));

export default function Home() {
  const movies = siteConfig.queryLists.movies;
  // const tvShows = siteConfig.queryLists.tvShows;

  return (
    <div className="flex flex-col gap-12">
      {movies.map(({ name, query, param }) => (
        <Suspense key={name}>
          <HomeMovieList name={name} query={query} param={param} />
        </Suspense>
      ))}
    </div>
  );
}
