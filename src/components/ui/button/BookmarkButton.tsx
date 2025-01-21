import IconButton from "./IconButton";
import { toast } from "sonner";
import { useLocalStorage } from "@mantine/hooks";
import { HiTrash } from "react-icons/hi2";
import { SavedMovieDetails } from "@/types/movie";
import { BsBookmarkCheckFill, BsBookmarkFill } from "react-icons/bs";
import { mutateMovieTitle } from "@/utils/movies";
import useDeviceVibration from "@/hooks/useDeviceVibration";

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
  title: mutateMovieTitle(movie),
  vote_average: movie.vote_average,
  saved_date: new Date().toISOString(),
});

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ movie, isTooltipDisabled }) => {
  const { startVibration } = useDeviceVibration();
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>({
    key: "bookmarks",
    defaultValue: [],
  });

  const movieData = extractImportantData(movie);
  const movieString = JSON.stringify(movieData);
  const isSaved = bookmarks.some((savedMovie) => JSON.parse(savedMovie).id === movie.id);
  const variant = isSaved ? "shadow" : "faded";
  const icon = isSaved ? <BsBookmarkCheckFill size={20} /> : <BsBookmarkFill size={20} />;
  const tooltip = isTooltipDisabled
    ? undefined
    : isSaved
      ? "Remove from Watchlist"
      : "Add to Watchlist";

  const handleBookmark = () => {
    if (isSaved) {
      setBookmarks(bookmarks.filter((savedMovie) => JSON.parse(savedMovie).id !== movie.id));
      toast(`${movieData.title} removed from your library!`, {
        icon: <HiTrash className="text-danger" />,
      });
    } else {
      setBookmarks([...bookmarks, movieString]);
      startVibration([100]);
      toast.success(`${movieData.title} saved to your library!`);
    }
  };

  return (
    <IconButton
      onPress={handleBookmark}
      icon={icon}
      variant={variant}
      color="warning"
      tooltip={tooltip}
    />
  );
};

export default BookmarkButton;
