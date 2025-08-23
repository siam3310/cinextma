import { ContentType } from "@/types";
import { useEffect, useState } from "react";

export type VidlinkEventType = "play" | "pause" | "seeked" | "ended" | "timeupdate";

export interface VidlinkEventData {
  type: "PLAYER_EVENT";
  data: {
    event: VidlinkEventType;
    currentTime: number;
    duration: number;
    mtmdbId: number;
    mediaType: ContentType;
    season?: number;
    episode?: number;
  };
}

type Data = VidlinkEventData["data"];

export interface UseVidlinkPlayerOptions {
  onPlay?: (data: Data) => void;
  onPause?: (data: Data) => void;
  onSeeked?: (data: Data) => void;
  onEnded?: (data: Data) => void;
  onTimeUpdate?: (data: Data) => void;
}

export function useVidlinkPlayer(options: UseVidlinkPlayerOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastEvent, setLastEvent] = useState<VidlinkEventType | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://vidlink.pro") return;
      const data = event.data as VidlinkEventData;

      if (data?.type === "PLAYER_EVENT") {
        const { event: eventType, currentTime, duration } = data.data;

        setLastEvent(eventType);

        switch (eventType) {
          case "play":
            setIsPlaying(true);
            options.onPlay?.(data.data);
            break;

          case "pause":
            setIsPlaying(false);
            options.onPause?.(data.data);
            break;

          case "ended":
            setIsPlaying(false);
            options.onEnded?.(data.data);
            break;

          case "seeked":
            setCurrentTime(currentTime);
            setDuration(duration);
            options.onSeeked?.(data.data);
            break;

          case "timeupdate":
            setCurrentTime(currentTime);
            setDuration(duration);
            options.onTimeUpdate?.(data.data);
            break;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [options]);

  return { isPlaying, currentTime, duration, lastEvent };
}
