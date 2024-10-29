import { useState } from 'react';
import { IconButton } from './IconButton';

const BookmarkButton = ({ isTooltipDisabled = false }: { isTooltipDisabled?: boolean }) => {
  const [isSaved, setSave] = useState(false);

  return (
    <IconButton
      onPress={() => setSave(!isSaved)}
      iconName="mingcute:bookmark-fill"
      variant={isSaved ? "shadow" : "faded"}
      color="warning"
      tooltip={isTooltipDisabled ? undefined : "Add Watchlist"}
    />
  );
};

export default BookmarkButton;