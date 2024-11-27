import { useFullscreen, useMediaQuery } from "@mantine/hooks";
import IconButton from "./IconButton";
import { MdFullscreenExit, MdFullscreen } from "react-icons/md";

export default function FullscreenToggleButton() {
  const { toggle, fullscreen } = useFullscreen();
  const pwaInstalled = useMediaQuery("(display-mode: standalone)");
  const icon = fullscreen ? <MdFullscreenExit className="size-full" /> : <MdFullscreen className="size-full" />;
  const tooltip = fullscreen ? "Minimize" : "Fullscreen";

  if (!pwaInstalled) return <IconButton tooltip={tooltip} tooltipPlacement="left" className="p-2" icon={icon} onPress={toggle} variant="light" />;
}
