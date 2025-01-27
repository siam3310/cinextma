import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { toast } from "sonner";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const LikeButton: React.FC<{ title: string }> = ({ title }) => {
  const [isLiked, setLike] = useState(false);
  const icon = <Icon icon="mdi:like" fontSize={24} />;
  const notify = () =>
    toast(`You ${!isLiked ? "liked" : "disliked"} ${title}`, {
      icon: !isLiked ? (
        <AiFillLike className="text-success" />
      ) : (
        <AiFillDislike className="text-danger" />
      ),
    });
  const handleLike = () => {
    setLike(!isLiked);
    notify();
  };

  return (
    <Button
      onPress={handleLike}
      color="success"
      variant={isLiked ? "shadow" : "faded"}
      startContent={icon}
    >
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
};

export default LikeButton;
