import { IconButton } from "./IconButton";
import { toast } from "sonner";
import { useLocalStorage } from "@mantine/hooks";
import { HiTrash } from "react-icons/hi2";
import { SavedMovieDetails } from "@/types/movie";

interface BookmarkButtonProps {
  movie: SavedMovieDetails;
  isTooltipDisabled?: boolean;
}

const extractImportantData = (movie: SavedMovieDetails) => ({
  adult: movie.adult,
  backdrop_path: movie.backdrop_path,
  id: movie.id,
  poster_path: movie.poster_path,
  release_date: movie.release_date,
  title: movie.original_language === "id" ? movie.original_title : movie.title,
  vote_average: movie.vote_average,
  saved_date: new Date().toISOString(),
});

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ movie, isTooltipDisabled }) => {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>({
    key: "bookmarks",
    defaultValue: [],
  });

  const movieData = extractImportantData(movie);
  const movieString = JSON.stringify(movieData);

  const isSaved = bookmarks.some((savedMovie) => JSON.parse(savedMovie).id === movie.id);

  const handleSave = () => {
    if (isSaved) {
      setBookmarks(bookmarks.filter((savedMovie) => JSON.parse(savedMovie).id !== movie.id));
      toast(`${movie.original_language === "id" ? movie.original_title : movie.title} removed from your library!`, {
        icon: <HiTrash className="text-danger" />,
      });
    } else {
      setBookmarks([...bookmarks, movieString]);
      toast.success(`${movie.original_language === "id" ? movie.original_title : movie.title} saved to your library!`);
    }
  };

  return (
    <IconButton
      onPress={handleSave}
      icon="mingcute:bookmark-fill"
      variant={isSaved ? "shadow" : "faded"}
      color="warning"
      text={isTooltipDisabled ? undefined : isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
    />
  );
};

export default BookmarkButton;
