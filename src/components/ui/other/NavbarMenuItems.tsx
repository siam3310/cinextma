import { siteConfig } from "@/config/site";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, Tab, Tabs, TabsProps } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

interface NavbarMenuItemsProps extends TabsProps {
  isIconOnly?: boolean;
  menuArray?: {
    href: string;
    label: string;
    icon?: string;
    activeIcon?: string;
  }[];
}

const NavbarMenuItems: React.FC<NavbarMenuItemsProps> = ({
  menuArray = siteConfig.navItems,
  isVertical,
  isIconOnly,
  variant = "underlined",
  size = "lg",
}) => {
  const pathName = usePathname();

  return (
    <Tabs
      size={size}
      variant={variant}
      selectedKey={pathName}
      isVertical={isVertical}
      classNames={{
        tabList: isVertical && "gap-5",
        tab: "h-full w-full",
        // tabContent: "w-16"
      }}
    >
      {menuArray.map((item) => {
        const isActive = pathName === item.href;
        let title: string | React.ReactNode = item.label;

        if (isIconOnly) {
          title = (
            <div className="flex flex-col items-center gap-2">
              <Icon icon={(isActive ? item.activeIcon : item.icon) ?? ""} fontSize={24} />
              <p>{item.label}</p>
            </div>
          );
        }

        return <Tab as={Link} href={item.href} key={item.href} className="text-start" title={title} />;
      })}
    </Tabs>
  );
};

export default NavbarMenuItems;
