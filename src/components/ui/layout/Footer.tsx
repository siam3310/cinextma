"use client";

import { siteConfig } from "@/config/site";
import { BreadcrumbItem, Breadcrumbs, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa6";

export const Footer = () => {
  const pathName = usePathname();
  const hrefs = ["/search"];
  const hide = hrefs.includes(pathName);

  return (
    !hide && (
      <footer className="bottom-0 flex w-full flex-col items-center justify-center gap-3 p-5 text-center">
        <h4 className="text-xl font-semibold">{siteConfig.description}</h4>
        <Link isExternal href={siteConfig.socials.github} color="foreground">
          <FaGithub size={30} />
        </Link>
        <Breadcrumbs
          separator="/"
          itemClasses={{
            separator: "px-2",
          }}
        >
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Music</BreadcrumbItem>
          <BreadcrumbItem>Artist</BreadcrumbItem>
          <BreadcrumbItem>Album</BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
        <p>© 2024</p>
      </footer>
    )
  );
};
