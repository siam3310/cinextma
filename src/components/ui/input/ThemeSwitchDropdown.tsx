"use client";

import { siteConfig } from "@/config/site";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const themes = siteConfig.themes;

const ThemeItem: React.FC<{ theme?: string; icon?: string }> = ({ theme, icon = "" }) => {
  return (
    <div className="flex items-center gap-2 capitalize">
      <Icon icon={icon} fontSize={18}></Icon>
      <p>{theme}</p>
    </div>
  );
};

const ThemeSwitchDropdown = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const themeIcon = themes.find(({ name }) => name === theme)?.icon;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="flat" color="warning" isLoading></Button>;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" color="warning">
          <ThemeItem icon={themeIcon} theme={theme} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disallowEmptySelection selectionMode="single">
        {themes.map((theme) => (
          <DropdownItem key={theme.name} onPress={() => setTheme(theme.name)}>
            <ThemeItem icon={theme.icon} theme={theme.name} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitchDropdown;
