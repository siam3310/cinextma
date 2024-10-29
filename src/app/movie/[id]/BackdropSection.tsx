import { Image } from "@nextui-org/image";
import { useWindowScroll } from "@uidotdev/usehooks";
import { MovieDetails } from "tmdb-ts/dist/types/movies";

interface MovieDetailsAppend extends MovieDetails {
  images?: {
    logos: {
      file_path: string;
    }[];
    posters: [];
    backdrops: [];
  };
}

const BackdropSection: React.FC<{ movie: MovieDetailsAppend }> = ({ movie }) => {
  const [{ y }] = useWindowScroll();
  //@ts-expect-error this variable is not undefined
  const opacity = Math.min((y / 1000) * 2, 1);
  const backdropImage = process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL_OR + movie.backdrop_path;
  //@ts-expect-error this variable is not undefined
  const titleImage = movie?.images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path
    ? //@ts-expect-error this variable is not undefined
      process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL + movie?.images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path
    : "";

  return (
    <section id="backdrop" className="fixed inset-0 h-[35vh] md:h-[50vh] lg:h-[70vh]">
      <div className="absolute inset-0 z-10 bg-background" style={{ opacity: opacity }} />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background from-[1%] via-transparent via-30%" />
      <div className="absolute inset-0 z-[2] translate-y-px bg-gradient-to-t from-background from-[1%] via-transparent via-55%" />
      <Image
        isBlurred
        alt={movie.title}
        classNames={{ wrapper: "absolute-center z-[1] bg-transparent" }}
        className="w-[25vh] max-w-80 drop-shadow-xl md:w-[60vh]"
        src={titleImage}
      />
      <Image
        radius="none"
        alt={movie.title}
        className="z-0 h-[35vh] w-screen object-cover object-center md:h-[50vh] lg:h-[70vh]"
        src={backdropImage}
        fallbackSrc={process.env.NEXT_PUBLIC_FALLBACK_IMG_URL}
      />
    </section>
  );
};

export default BackdropSection;
