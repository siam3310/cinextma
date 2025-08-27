import useDeviceVibration from "@/hooks/useDeviceVibration";
import { SavedMovieDetails } from "@/types/movie";
import { useLocalStorage } from "@mantine/hooks";
import { BsBookmarkCheckFill, BsBookmarkFill } from "react-icons/bs";
import IconButton from "./IconButton";
import { Trash } from "@/utils/icons";
import { LIBRARY_STORAGE_KEY } from "@/utils/constants";
import { addToast } from "@heroui/react";

interface BookmarkButtonProps {
  data: SavedMovieDetails;
  isTooltipDisabled?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ data, isTooltipDisabled }) => {
  const { startVibration } = useDeviceVibration();
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkButtonProps["data"][]>({
    key: LIBRARY_STORAGE_KEY,
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
      addToast({
        title: `${movieData.title} removed from your library!`,
        color: "danger",
        icon: <Trash />,
      });
    } else {
      setBookmarks([...bookmarks, movieData]);
      startVibration([100]);
      addToast({
        title: `${movieData.title} saved to your library!`,
        color: "success",
      });
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
