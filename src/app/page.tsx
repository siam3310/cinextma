import HomeMovieList from "./HomeMovieList";
import { siteConfig } from "@/config/site";

export default function Home() {
  const movies = siteConfig.queryLists.movies;
  // const tvShows = siteConfig.queryLists.tvShows;

  return (
    <div className="flex flex-col gap-12">
      {movies.map(({ name, query, param }) => (
        <HomeMovieList key={name} name={name} query={query} param={param} />
      ))}
    </div>
  );
}
