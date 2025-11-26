import { ContentType } from "@/types";
import { useEffect, useRef, useState } from "react";

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
  metadata?: {
    season?: number;
    episode?: number;
  };
  onPlay?: (data: Data) => void;
  onPause?: (data: Data) => void;
  onSeeked?: (data: Data) => void;
  onEnded?: (data: Data) => void;
  onTimeUpdate?: (data: Data) => void;
}

export function useVidlinkPlayer(options: UseVidlinkPlayerOptions = {}) {
  const { metadata, onPlay, onPause, onSeeked, onEnded, onTimeUpdate } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastEvent, setLastEvent] = useState<VidlinkEventType | null>(null);
  const eventDataRef = useRef<Data | null>(null);
  const episodeRed = useRef<number | null>(null);
  const seasonRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://vidlink.pro") return;
      const data = event.data as VidlinkEventData;

      if (data?.type === "PLAYER_EVENT") {
        const { event: eventType, currentTime, duration, season, episode } = data.data;

        setLastEvent(eventType);

        if (data.data) {
          eventDataRef.current = data.data;
          seasonRef.current = season || metadata?.season || 0;
          episodeRed.current = episode || metadata?.episode || 0;
        }

        switch (eventType) {
          case "play":
            setIsPlaying(true);
            onPlay?.(data.data);
            break;

          case "pause":
            setIsPlaying(false);
            onPause?.(data.data);
            break;

          case "ended":
            setIsPlaying(false);
            onEnded?.(data.data);
            break;

          case "seeked":
            setCurrentTime(currentTime);
            setDuration(duration);
            onSeeked?.(data.data);
            break;

          case "timeupdate":
            setCurrentTime(currentTime);
            setDuration(duration);
            onTimeUpdate?.(data.data);
            break;
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return { isPlaying, currentTime, duration, lastEvent };
}
