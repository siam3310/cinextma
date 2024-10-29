"use client";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import BackButton from "@/components/ui/button/BackButton";
import { useWindowScroll } from "@uidotdev/usehooks";
// import NavbarMenuItems from "../other/NavbarMenuItems";
import { SearchInput } from "../input/SearchInput";
import ThemeSwitchDropdown from "../input/ThemeSwitchDropdown";

const TopNavbar = () => {
  const pathName = usePathname();
  const [{ y }] = useWindowScroll();
  //@ts-expect-error this variable is not undefined
  const opacity = Math.min((y / 1000) * 5, 1);
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);

  return show ? (
    <Navbar disableScrollHandler isBlurred={false} maxWidth="full" position="sticky" className="inset-0 -translate-y-px bg-background">
      <NavbarBrand>
        <ThemeSwitchDropdown />
      </NavbarBrand>
      <NavbarContent className="hidden w-full max-w-lg gap-2 md:flex" justify="center">
        <NavbarItem className="w-full">
          <SearchInput></SearchInput>
          {/* <NavbarMenuItems/> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
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
    </Navbar>
  );
};

export default TopNavbar;
