import IconButton from "./IconButton";
import { useRouter } from "next-nprogress-bar";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <IconButton
      icon="line-md:chevron-left"
      iconSize={32}
      variant="light"
      tooltip="Back"
      tooltipProps={{ placement: "right" }}
      onPress={() => router.back()}
    />
  );
};

export default BackButton;
