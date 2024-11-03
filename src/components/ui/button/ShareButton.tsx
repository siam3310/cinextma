"use client";

import { IconButton } from "./IconButton";
import { useClipboard } from "@mantine/hooks";
import { toast } from "sonner";

const ShareButton: React.FC = () => {
  const { copy, copied } = useClipboard({ timeout: 2000 });
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Movie's link copied to clipboard!");
  };

  return <IconButton isDisabled={copied} onPress={handleShare} icon={copied ? "mingcute:check-fill" : "mdi:share"} variant="ghost" tooltip="Share" />;
};

export default ShareButton;
