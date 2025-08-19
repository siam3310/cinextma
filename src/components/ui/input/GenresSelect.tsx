import { cn } from "@/utils/helpers";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Genre } from "tmdb-ts";
import { Genres } from "tmdb-ts/dist/endpoints";

interface GenresSelectProps extends Omit<SelectProps, "children" | "isLoading" | "selectionMode"> {
  query: Promise<Genres> | Genres;
  type: "movie" | "tv";
}

const GenresSelect: React.FC<GenresSelectProps> = ({ query, type, ...props }) => {
  const { data, isPending } = useQuery({
    queryFn: () => query,
    queryKey: ["get-movie-genres", type],
  });

  const genres = data?.genres as Genre[];

  return (
    <Select
      {...props}
      size="sm"
      isLoading={isPending}
      selectionMode="multiple"
      label={props.label ?? "Genres"}
      placeholder={props.placeholder ?? "Select genres"}
      className={cn("max-w-xs", props.className)}
    >
      {genres?.map(({ id, name }) => {
        return <SelectItem key={id}>{name}</SelectItem>;
      })}
    </Select>
  );
};

export default GenresSelect;
