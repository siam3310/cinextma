import { Chip, Link } from "@heroui/react";
import { Genre } from "tmdb-ts";

interface GenresProps {
  genres: Genre[];
  chipSize?: "sm" | "md" | "lg";
  chipVariant?: "flat" | "solid" | "bordered" | "light" | "faded" | "shadow" | "dot";
}

const Genres: React.FC<GenresProps> = ({ genres, chipSize = "sm", chipVariant = "flat" }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map(({ id, name }) => (
        <Chip
          as={Link}
          href={`/discover?genres=${id}`}
          key={id}
          size={chipSize}
          variant={chipVariant}
          radius="full"
        >
          {name}
        </Chip>
      ))}
    </div>
  );
};

export default Genres;
