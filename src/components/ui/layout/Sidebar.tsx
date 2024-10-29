"use client";

import React from "react";
import NavbarMenuItems from "../other/NavbarMenuItems";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const shouldShowSidebar = hrefs.includes(pathName);

  return (
    <div className="flex h-full">
      {shouldShowSidebar && (
        <aside className="sticky top-0 hidden h-screen w-fit md:block">
          <nav className="flex h-full flex-col justify-center bg-background pl-4 text-foreground">
            <NavbarMenuItems size="sm" isVertical isIconOnly variant="light" />
          </nav>
        </aside>
      )}
      {children}
    </div>
  );
};

export default Sidebar;
