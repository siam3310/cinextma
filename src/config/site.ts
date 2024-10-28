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
      label: "Trending",
      href: "/trending",
      icon: "icon-park-outline:fire",
      activeIcon: "icon-park-solid:fire",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: "mingcute:settings-1-line",
      activeIcon: "mingcute:settings-1-fill",
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
