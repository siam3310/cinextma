import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";

const LikeButton: React.FC<{ title: string }> = ({ title }) => {
  const [isLiked, setLike] = useState(false);
  const icon = <Icon icon="mdi:like" fontSize={24} />;
  const notify = () => toast.success(`You ${!isLiked ? "liked" : "disliked"} ${title}`);
  const handleLike = () => {
    setLike(!isLiked);
    notify();
  };

  return (
    <Button onPress={handleLike} color="success" variant={isLiked ? "shadow" : "faded"} startContent={icon}>
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
};

export default LikeButton;
