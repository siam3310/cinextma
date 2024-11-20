"use client";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextLink, Button } from "@nextui-org/react";
import BackButton from "@/components/ui/button/BackButton";
import { useWindowScroll } from "@mantine/hooks";
import SearchInput from "../input/SearchInput";
import ThemeSwitchDropdown from "../input/ThemeSwitchDropdown";
import clsx from "clsx";
import FullscreenToggleButton from "../button/FullscreenToggleButton";
import { Saira } from "@/lib/fonts";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TopNavbar = () => {
  const pathName = usePathname();
  const [{ y }] = useWindowScroll();
  const opacity = Math.min((y / 1000) * 5, 1);
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);

  return (
    <Navbar
      disableScrollHandler
      isBlurred={false}
      position="sticky"
      maxWidth="full"
      classNames={{ wrapper: "px-2 md:px-4" }}
      className={cn("inset-0 h-min bg-transparent", {
        "bg-background": show,
      })}
    >
      {!show && <div className="absolute inset-0 h-full w-full border-b border-background bg-background" style={{ opacity: opacity }} />}
      <NavbarBrand>
        {show ? (
          <div>
            <Link href="/" className={clsx("tracking-widest", Saira.className)} style={{ fontWeight: 600, fontSize: 30 }}>
              CINEXTMA
            </Link>
          </div>
        ) : (
          <BackButton />
        )}
      </NavbarBrand>
      {show && (
        <NavbarContent className="hidden w-full max-w-lg gap-2 md:flex" justify="center">
          <NavbarItem className={clsx("w-full", pathName.startsWith("/search") && "hidden")}>
            <Link href="/search" className="w-full">
              <SearchInput className="pointer-events-none" placeholder="Search your favorite movies..." />
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-3">
          <ThemeSwitchDropdown />
          <FullscreenToggleButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavbar;
