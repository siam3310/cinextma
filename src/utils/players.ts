/**
 * Generates a list of movie players with their respective titles and source URLs.
 * Each player is constructed using the provided movie ID.
 *
 * @param {string | number} id - The ID of the movie to be embedded in the player URLs.
 * @returns {Array<{ title: string, source: string }>} - An array of objects, each containing
 * the title of the player and the corresponding source URL.
 */
export function getMoviePlayers(id: string | number) {
  const players = [
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
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
  const players = [
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
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
