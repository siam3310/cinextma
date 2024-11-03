"use client";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import BackButton from "@/components/ui/button/BackButton";
import { useWindowScroll } from "@mantine/hooks";
// import NavbarMenuItems from "../other/NavbarMenuItems";
import SearchInput from "../input/SearchInput";
import ThemeSwitchDropdown from "../input/ThemeSwitchDropdown";
import clsx from "clsx";
import FullscreenToggleButton from "../button/FullscreenToggleButton";

const TopNavbar = () => {
  const pathName = usePathname();
  const [{ y }] = useWindowScroll();
  const opacity = Math.min((y / 1000) * 5, 1);
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);

  return show ? (
    <Navbar
      disableScrollHandler
      isBlurred={false}
      position="sticky"
      maxWidth="full"
      classNames={{ wrapper: "px-2 md:px-4" }}
      className="inset-0 h-min -translate-y-px bg-background"
    >
      <NavbarBrand>
        <ThemeSwitchDropdown />
      </NavbarBrand>
      <NavbarContent className="hidden w-full max-w-lg gap-2 md:flex" justify="center">
        <NavbarItem className={clsx("w-full", pathName.startsWith("/search") && "hidden")}>
          <Link href="/search" className="w-full">
            <SearchInput className="pointer-events-none" placeholder="Search your favorite movies..." />
          </Link>
          {/* <NavbarMenuItems/> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <FullscreenToggleButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  ) : (
    <Navbar
      disableScrollHandler
      maxWidth="full"
      position="sticky"
      isBlurred={false}
      className="-translate-y-px bg-transparent"
      classNames={{ wrapper: "px-2 md:px-4" }}
    >
      <div className="absolute inset-0 h-full w-full border-b border-background bg-background" style={{ opacity: opacity }}></div>
      <NavbarBrand>
        <BackButton />
      </NavbarBrand>
      <NavbarContent justify="end">
        <FullscreenToggleButton />
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavbar;
