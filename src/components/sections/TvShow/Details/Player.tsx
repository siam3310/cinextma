import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { ArrowLeft, Menu, Next, Prev } from "@/utils/icons";
import { getTvShowPlayers } from "@/utils/players";
import { useRouter } from "@bprogress/next/app";
import { Card, Skeleton, Tooltip } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import { memo, useMemo } from "react";
import { Episode } from "tmdb-ts";
const PlayerSourceSelection = dynamic(() => import("./PlayerSourceSelection"));

interface TvShowPlayerProps {
  id: number;
  seriesName: string;
  seasonName: string;
  episode: Episode;
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  tooltip?: string;
}

interface PlayerHeaderProps extends TvShowPlayerProps {
  idle: boolean;
  selectedSource: number;
  onOpenMenu: () => void;
}

const TvShowPlayer: React.FC<TvShowPlayerProps> = ({ id, seriesName, seasonName, episode }) => {
  useDocumentTitle(`${seriesName} - ${seasonName} - ${episode.name} | ${siteConfig.name}`);

  const players = getTvShowPlayers(id, episode.season_number, episode.episode_number);
  const idle = useIdle(3000);
  const [opened, handlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "src",
    parseAsInteger.withDefault(0),
  );

  const PLAYER = useMemo(() => players[selectedSource] || players[0], [players, selectedSource]);

  return (
    <>
      <div className="relative">
        <PlayerHeader
          id={id}
          seriesName={seriesName}
          seasonName={seasonName}
          episode={episode}
          idle={idle}
          selectedSource={selectedSource}
          onOpenMenu={handlers.open}
        />

        <Card shadow="md" radius="none" className="relative -mx-3 -my-8 h-screen md:-mx-5">
          <Skeleton className="absolute h-full w-full" />
          <iframe
            key={PLAYER.title}
            className={cn("z-10 h-full", { "pointer-events-none": idle })}
            src={PLAYER.source}
            allowFullScreen
          />
        </Card>
      </div>

      <PlayerSourceSelection
        opened={opened}
        onClose={handlers.close}
        players={players}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
    </>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, children, tooltip }) => {
  const btn = (
    <button aria-label={label} onClick={onClick} className="group drop-shadow-md">
      {children}
    </button>
  );

  return tooltip ? (
    <Tooltip content={tooltip} showArrow placement="bottom">
      {btn}
    </Tooltip>
  ) : (
    btn
  );
};

const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  id,
  seriesName,
  seasonName,
  episode,
  idle,
  selectedSource,
  onOpenMenu,
}) => {
  const router = useRouter();

  return (
    <>
      <div
        aria-hidden={idle}
        className={cn("absolute top-4 z-50 w-full text-center transition-opacity", {
          "opacity-0": idle,
        })}
      >
        <p className="text-shadow-sm text-shadow-blur-md text-sm text-white sm:text-lg lg:text-xl">
          {seriesName}
        </p>
        <p className="text-shadow-sm text-shadow-blur-md text-xs text-gray-200 sm:text-sm lg:text-base">
          {seasonName} - {episode.name}
        </p>
      </div>

      <div
        aria-hidden={idle}
        className={cn(
          "absolute top-4 z-50 flex w-full items-center justify-between gap-4 text-white transition-opacity",
          { "opacity-0": idle },
        )}
      >
        <ActionButton label="Back" onClick={() => router.push(`/tv/${id}`)}>
          <ArrowLeft
            size={42}
            className="transition-all group-hover:scale-125 group-hover:text-warning"
          />
        </ActionButton>

        <div className="flex items-center gap-4">
          <ActionButton
            label="Previous Episode"
            tooltip="Previous Episode"
            onClick={() =>
              router.push(
                `/tv/${id}/${episode.season_number}/${episode.episode_number - 1}/player?src=${selectedSource}`,
              )
            }
          >
            <Prev
              size={42}
              className="transition-all group-hover:scale-125 group-hover:text-warning"
            />
          </ActionButton>

          <ActionButton
            label="Next Episode"
            tooltip="Next Episode"
            onClick={() =>
              router.push(
                `/tv/${id}/${episode.season_number}/${episode.episode_number + 1}/player?src=${selectedSource}`,
              )
            }
          >
            <Next
              size={42}
              className="transition-all group-hover:scale-125 group-hover:text-warning"
            />
          </ActionButton>

          <ActionButton label="Menu" tooltip="Menu" onClick={onOpenMenu}>
            <Menu
              size={42}
              className="transition-all group-hover:scale-125 group-hover:text-warning"
            />
          </ActionButton>
        </div>
      </div>
    </>
  );
};

export default memo(TvShowPlayer);
