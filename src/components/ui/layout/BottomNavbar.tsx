"use client";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathName = usePathname();
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);

  return (
    show && (
      <>
        <div className="pt-20" />
        <div className="fixed bottom-0 left-0 z-50 block h-[70px] w-full translate-y-px border-t border-secondary-background bg-background md:hidden">
          <div className="mx-auto grid h-full max-w-lg grid-cols-4">
            {siteConfig.navItems.map((item) => {
              const isActive = pathName === item.href;

              return (
                <Link href={item.href} key={item.href} className="flex items-center justify-center text-foreground">
                  <div className="flex flex-col items-center justify-center gap-1 px-4">
                    <Icon icon={isActive ? item.activeIcon : item.icon} fontSize={24} />
                    <p className={clsx("text-sm", { "font-bold": isActive })}>{item.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

export default BottomNavbar;
