import { PlayersProps } from "@/types";
import { commonColors, semanticColors } from "@nextui-org/theme";

/**
 * Generates a list of movie players with their respective titles and source URLs.
 * Each player is constructed using the provided movie ID.
 *
 * @param {string | number} id - The ID of the movie to be embedded in the player URLs.
 * @returns {Array<{ title: string, source: string }>} - An array of objects, each containing
 * the title of the player and the corresponding source URL.
 */
export function getMoviePlayers(id: string | number) {
  const players: Array<PlayersProps> = [
    {
      title: "VidLink",
      source: `https://vidlink.pro/movie/${id}?primaryColor=006fee&autoplay=false`,
      recommended: true,
      fast: true,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
      recommended: true,
    },
    {
      title: "<Embed>",
      source: `https://embed.su/embed/movie/${id}`,
      recommended: true,
    },
    {
      title: "FilmKu",
      source: `https://filmku.stream/embed/${id}`,
    },
    {
      title: "NontonGo",
      source: `https://www.nontongo.win/embed/movie/${id}`,
    },
    {
      title: "AutoEmbed",
      source: `https://autoembed.co/movie/tmdb/${id}`,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embed/${id}`,
    },
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/movie/${id}`,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.to/embed/movie/${id}`,
    },
    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/movie/${id}`,
    },
  ];

  return players;
}

/**
 * Generates a list of TV show players with their respective titles and source URLs.
 * Each player is constructed using the provided TV show ID, season, and episode.
 *
 * @param {string | number} id - The ID of the TV show to be embedded in the player URLs.
 * @param {string | number} [season] - The season number of the TV show episode to be embedded.
 * @param {string | number} [episode] - The episode number of the TV show episode to be embedded.
 * @returns {Array<{ title: string, source: string }>} - An array of objects, each containing
 * the title of the player and the corresponding source URL.
 */
export function getTvShowPlayers(id: string | number, season?: number, episode?: number) {
  const players: Array<PlayersProps> = [
    {
      title: "VidLink",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}`,
      recommended: true,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
      recommended: true,
    },
    {
      title: "<Embed>",
      source: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
      recommended: true,
    },
    {
      title: "FilmKu",
      source: `https://filmku.stream/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
    },
    {
      title: "NontonGo",
      source: `https://www.NontonGo.win/embed/tv/${id}/${season}/${episode}`,
    },
    {
      title: "AutoEmbed",
      source: `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
    },
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
    },
    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/tv/${id}/${season}/${episode}`,
    },
  ];

  return players;
}
