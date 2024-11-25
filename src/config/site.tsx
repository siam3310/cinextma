import { tmdb } from "@/api/tmdb";
import { BiSearchAlt2, BiSolidSearchAlt2 } from "react-icons/bi";
import { GoHomeFill, GoHome } from "react-icons/go";
import { HiComputerDesktop } from "react-icons/hi2";
import { IoIosSunny } from "react-icons/io";
import { IoCompass, IoCompassOutline, IoMoon } from "react-icons/io5";
import { TbFolder, TbFolderFilled } from "react-icons/tb";

export const siteConfig = {
  name: "Cinextma",
  description: "Your only choice for a free movies and tv shows streaming website.",
  favicon: "/favicon.ico",
  navItemsOld: [
    {
      label: "Home",
      href: "/",
      icon: "fluent:home-24-regular",
      activeIcon: "fluent:home-24-filled",
    },
    {
      label: "Discover",
      href: "/discover",
      icon: "iconamoon:discover-light",
      activeIcon: "iconamoon:discover-fill",
    },
    {
      label: "Seach",
      href: "/search",
      icon: "bx:search",
      activeIcon: "bxs:search",
    },
    {
      label: "Library",
      href: "/library",
      icon: "fluent:folder-open-20-regular",
      activeIcon: "fluent:folder-open-20-filled",
    },
  ],
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: <GoHome className="size-full" />,
      activeIcon: <GoHomeFill className="size-full" />,
    },
    {
      label: "Discover",
      href: "/discover",
      icon: <IoCompassOutline className="size-full" />,
      activeIcon: <IoCompass className="size-full" />,
    },
    {
      label: "Seach",
      href: "/search",
      icon: <BiSearchAlt2 className="size-full" />,
      activeIcon: <BiSolidSearchAlt2 className="size-full" />,
    },
    {
      label: "Library",
      href: "/library",
      icon: <TbFolder className="size-full" />,
      activeIcon: <TbFolderFilled className="size-full" />,
    },
  ],
  themes: [
    {
      name: "light",
      icon: <IoIosSunny className="size-full animate-spin duration-[3000ms]" />,
    },
    {
      name: "dark",
      icon: <IoMoon className="size-full" />,
    },
    {
      name: "system",
      icon: <HiComputerDesktop className="size-full" />,
    },
  ],
  queryLists: {
    movies: [
      {
        name: "Today's Trending Movies",
        query: tmdb.trending.trending("movie", "day"),
        param: "todayTrending",
      },
      {
        name: "This Week's Trending Movies",
        query: tmdb.trending.trending("movie", "week"),
        param: "thisWeekTrending",
      },
      {
        name: "Popular Movies",
        query: tmdb.movies.popular(),
        param: "popular",
      },
      {
        name: "Now Playing Movies",
        query: tmdb.movies.nowPlaying(),
        param: "nowPlaying",
      },
      {
        name: "Upcoming Movies",
        query: tmdb.movies.upcoming(),
        param: "upcoming",
      },
      {
        name: "Top Rated Movies",
        query: tmdb.movies.topRated(),
        param: "topRated",
      },
    ],
    tvShows: [
      {
        name: "Today's Trending TV Shows",
        query: tmdb.trending.trending("tv", "day"),
      },
      {
        name: "This Week's Trending TV Shows",
        query: tmdb.trending.trending("tv", "week"),
      },
      {
        name: "Popular TV Shows",
        query: tmdb.tvShows.popular(),
      },
      {
        name: "On The Air TV Shows",
        query: tmdb.tvShows.onTheAir(),
      },
      {
        name: "Top Rated TV Shows",
        query: tmdb.tvShows.topRated(),
      },
    ],
  },
  socials: {
    github: "https://github.com/wisnuwirayuda15/cinextma",
  },
};

export type SiteConfig = typeof siteConfig;
