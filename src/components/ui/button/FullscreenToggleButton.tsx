import { useFullscreen } from "@mantine/hooks";
import { IconButton } from "./IconButton";
import { MdFullscreenExit, MdFullscreen } from "react-icons/md";

export default function FullscreenToggleButton() {
  const { toggle, fullscreen } = useFullscreen();
  const icon = fullscreen ? <MdFullscreenExit className="size-full" /> : <MdFullscreen className="size-full" />;
  const tooltip = fullscreen ? "Minimize" : "Fullscreen";

  return <IconButton tooltip={tooltip} tooltipPlacement="left" buttonClassName="p-2" icon={icon} onPress={toggle} variant="light" />;
}
