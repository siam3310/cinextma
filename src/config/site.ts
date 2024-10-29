export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cinextma",
  description: "Your only choice for a free movie streaming website.",
  favicon: "/favicon.ico",
  navItems: [
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
  themes: [
    {
      name: "light",
      icon: "line-md:sunny-filled",
    },
    {
      name: "dark",
      icon: "line-md:moon-filled",
    },
    {
      name: "system",
      icon: "line-md:computer-twotone",
    },
  ],
  breakpoints: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    xxl: "(min-width: 1536px)",
  },
};
