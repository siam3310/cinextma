import { syncHistory } from "@/actions/histories";
import { ContentType } from "@/types";
import { useEffect, useRef, useState } from "react";
import useSupabaseUser from "./useSupabaseUser";
import { useDocumentVisibility } from "@mantine/hooks";
import { diff } from "@/utils/helpers";

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
  saveHistory?: boolean;
  onPlay?: (data: Data) => void;
  onPause?: (data: Data) => void;
  onSeeked?: (data: Data) => void;
  onEnded?: (data: Data) => void;
  onTimeUpdate?: (data: Data) => void;
}

export function useVidlinkPlayer(options: UseVidlinkPlayerOptions = {}) {
  const { data: user } = useSupabaseUser();
  const documentState = useDocumentVisibility();
  const { metadata, saveHistory, onPlay, onPause, onSeeked, onEnded, onTimeUpdate } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastEvent, setLastEvent] = useState<VidlinkEventType | null>(null);
  const [lastCurrentTime, setLastCurrentTime] = useState(0);
  const eventDataRef = useRef<Data | null>(null);
  const episodeRed = useRef<number | null>(null);
  const seasonRef = useRef<number | null>(null);

  const syncToServer = async (data: Data, completed?: boolean) => {
    if (!saveHistory || !user) return;
    if (diff(data.currentTime, lastCurrentTime) <= 5) return; //prevent spam

    const dataToSync: Data = {
      ...data,
      season: seasonRef.current || 0,
      episode: episodeRed.current || 0,
    };

    const { success, message } = await syncHistory(dataToSync, completed);

    if (success) {
      setLastCurrentTime(data.currentTime);
      return;
    }

    console.error("Save history failed:", message);
  };

  useEffect(() => {
    if (!saveHistory || !user) return;
    if (documentState === "visible") return;
    if (!eventDataRef.current) return;
    syncToServer(eventDataRef.current);
  }, [documentState, lastCurrentTime]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!saveHistory || !user) return;

      if (eventDataRef.current) {
        const payload = {
          ...eventDataRef.current,
          season: seasonRef.current || 0,
          episode: episodeRed.current || 0,
          completed: eventDataRef.current.event === "ended",
        };

        navigator.sendBeacon("/api/player/save-history", JSON.stringify(payload));
      }
    };

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
            syncToServer(data.data, true);
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
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (eventDataRef.current) {
        handleBeforeUnload();
      }

      window.removeEventListener("message", handleMessage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { isPlaying, currentTime, duration, lastEvent };
}
