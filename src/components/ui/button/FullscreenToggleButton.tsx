import { useFullscreen } from "@mantine/hooks";
import { IconButton } from "./IconButton";
import { MdFullscreenExit, MdFullscreen } from "react-icons/md";

export default function FullscreenToggleButton() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <IconButton
      tooltip={fullscreen ? "Minimize" : "Fullscreen"}
      tooltipPlacement="left"
      buttonClassName="p-2"
      icon={!fullscreen ? <MdFullscreen className="size-full" /> : <MdFullscreenExit className="size-full" />}
      onPress={toggle}
      variant="light"
    />
  );
}
