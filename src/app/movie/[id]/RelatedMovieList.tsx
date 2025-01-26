import HomePosterCard from "@/app/HomePosterCard";
import { Movie } from "tmdb-ts/dist/types";
import Carousel from "@/components/ui/wrapper/Carousel";

const RelatedMovieList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div className="z-[3] flex flex-col gap-2">
      <Carousel classNames={{ container: "gap-2" }}>
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="flex min-h-fit max-w-fit items-center px-1 py-2">
              <HomePosterCard movie={movie}></HomePosterCard>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default RelatedMovieList;
