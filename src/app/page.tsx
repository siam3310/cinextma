import HomeMovieList from "./HomeMovieList";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {siteConfig.queryLists.movies.map((movie) => (
        <HomeMovieList key={movie.name} name={movie.name} query={movie.query} param={movie.param} />
      ))}

      {/* <div className="h-24 w-72 relative">
        <div className="absolute h-full w-full bg-red-900 inset-0 z-0"></div>
        <div className="absolute h-full w-full bg-gradient-to-r from-foreground inset-0 z-10"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-foreground inset-0 z-10"></div>
      </div> */}
    </div>
  );
}
