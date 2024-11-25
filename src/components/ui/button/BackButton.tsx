import IconButton from "./IconButton";
import { useRouter } from "next-nprogress-bar";

const BackButton = () => {
  const router = useRouter();

  return <IconButton icon="line-md:chevron-left" iconSize={32} variant="light" tooltip="Back" tooltipPlacement="right" onPress={() => router.push("/")} />;
};

export default BackButton;
