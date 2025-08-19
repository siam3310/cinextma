import { PlayersProps } from "@/types";
import VaulDrawer from "@/components/ui/overlay/VaulDrawer";
import { HandlerType } from "@/types/component";
import SelectButton from "@/components/ui/input/SelectButton";
import { Ads, Rocket, Star } from "@/utils/icons";
import { cn } from "@/utils/helpers";

interface PlayerSourceSelectionProps extends HandlerType {
  players: PlayersProps[];
  selectedSource: number;
  setSelectedSource: (source: number) => void;
}

const PlayerSourceSelection: React.FC<PlayerSourceSelectionProps> = ({
  opened,
  onClose,
  players,
  selectedSource,
  setSelectedSource,
}) => {
  return (
    <VaulDrawer
      open={opened}
      onClose={onClose}
      backdrop="blur"
      title="Select Source"
      direction="right"
      hiddenHandler
      withCloseButton
      classNames={{ content: "space-y-0" }}
    >
      <div className="p-5">
        <SelectButton
          color="warning"
          groupType="list"
          value={selectedSource.toString()}
          onChange={(value) => {
            setSelectedSource(Number(value || 0));
            onClose();
          }}
          data={players.map(({ title, recommended, fast, ads }, index) => {
            return {
              label: title,
              value: index.toString(),
              endContent: (
                <div key={`info-${title}`} className="flex flex-wrap items-center gap-2">
                  {recommended && <Star className="text-warning" />}
                  {fast && <Rocket className="text-danger" />}
                  {ads && <Ads className="text-primary" />}
                </div>
              ),
            };
          })}
        />
      </div>
    </VaulDrawer>
  );
};

export default PlayerSourceSelection;
