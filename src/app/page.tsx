import { tmdb } from "@/api/tmdb";
import HomeList from "./HomeList";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <HomeList name="Trending" query={tmdb.trending.trending("movie", "week")} />
      <HomeList name="Popular" query={tmdb.movies.popular()} />
      <HomeList name="Now Playing" query={tmdb.movies.nowPlaying()} />
      <HomeList name="Upcoming" query={tmdb.movies.upcoming()} />
      <HomeList name="Top Rated" query={tmdb.movies.topRated()} />

      {/* <div className="h-24 w-72 relative">
        <div className="absolute h-full w-full bg-red-900 inset-0 z-0"></div>
        <div className="absolute h-full w-full bg-gradient-to-r from-foreground inset-0 z-10"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-foreground inset-0 z-10"></div>
      </div> */}
    </div>
  );
}
