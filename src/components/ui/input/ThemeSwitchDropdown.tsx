"use client";

import { siteConfig } from "@/config/site";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const themes = siteConfig.themes;

const ThemeItem: React.FC<{ theme?: string; icon?: React.ReactNode }> = ({ theme, icon = "" }) => {
  return (
    <div className="flex items-center gap-2 capitalize">
      <div className="max-h-[50px]">{icon}</div>
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
    return null;
  }

  const color = theme === "dark" ? "primary" : theme === "light" ? "warning" : "default";

  return (
    <Dropdown
      classNames={{
        content: "min-w-fit",
      }}
    >
      <DropdownTrigger>
        <Button isIconOnly variant="light" color={color} className="p-2">
          {themeIcon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu disallowEmptySelection selectionMode="single">
        {themes.map((theme) => (
          <DropdownItem key={theme.name} onPress={() => setTheme(theme.name)} textValue={theme.name}>
            <ThemeItem icon={theme.icon} theme={theme.name} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitchDropdown;
