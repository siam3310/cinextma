import useDeviceVibration from "@/hooks/useDeviceVibration";
import { SavedMovieDetails } from "@/types/movie";
import { useLocalStorage } from "@mantine/hooks";
import { BsBookmarkCheckFill, BsBookmarkFill } from "react-icons/bs";
import { toast } from "sonner";
import IconButton from "./IconButton";
import { Trash } from "@/utils/icons";

interface BookmarkButtonProps {
  data: SavedMovieDetails;
  isTooltipDisabled?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ data, isTooltipDisabled }) => {
  const { startVibration } = useDeviceVibration();
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkButtonProps["data"][]>({
    key: "bookmarks",
    defaultValue: [],
  });

  const movieData = data;
  const isSaved = bookmarks.some((savedMovie) => savedMovie.id === data.id);
  const variant = isSaved ? "shadow" : "faded";
  const icon = isSaved ? <BsBookmarkCheckFill size={20} /> : <BsBookmarkFill size={20} />;
  const tooltip = isTooltipDisabled
    ? undefined
    : isSaved
      ? "Remove from Watchlist"
      : "Add to Watchlist";

  const handleBookmark = () => {
    if (isSaved) {
      setBookmarks(bookmarks.filter((savedMovie) => savedMovie.id !== data.id));
      toast(`${movieData.title} removed from your library!`, {
        icon: <Trash className="text-danger" />,
      });
    } else {
      setBookmarks([...bookmarks, movieData]);
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
