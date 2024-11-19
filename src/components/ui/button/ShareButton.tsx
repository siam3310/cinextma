"use client";

import { IconButton } from "./IconButton";
import { useClipboard } from "@mantine/hooks";
import { FaCheck } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { toast } from "sonner";

const ShareButton: React.FC = () => {
  const { copy, copied } = useClipboard({ timeout: 2000 });
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Movie's link copied to clipboard!");
  };

  const shareIcon = <IoIosShareAlt size={20} />;
  const checkIcon = <FaCheck size={20} />;

  return <IconButton isDisabled={copied} onPress={handleShare} icon={copied ? checkIcon : shareIcon} variant="ghost" tooltip="Share" />;
};

export default ShareButton;
