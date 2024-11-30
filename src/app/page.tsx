import HomeMovieList from "./HomeMovieList";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {siteConfig.queryLists.movies.map((movie) => (
        <HomeMovieList key={movie.name} name={movie.name} query={movie.query} param={movie.param} />
      ))}
    </div>
  );
}
