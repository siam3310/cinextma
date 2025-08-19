import Carousel from "@/components/ui/wrapper/Carousel";
import { TV } from "tmdb-ts/dist/types";
import TvShowHomeCard from "../HomeCard";

interface TvShowRelatedListProps {
  tvs: TV[];
}

const TvShowRelatedList: React.FC<TvShowRelatedListProps> = ({ tvs }) => {
  return (
    <div className="z-[3] flex flex-col gap-2">
      <Carousel classNames={{ container: "gap-2" }}>
        {tvs.map((tv) => {
          return (
            <div key={tv.id} className="flex min-h-fit max-w-fit items-center px-1 py-2">
              <TvShowHomeCard tv={tv} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default TvShowRelatedList;
