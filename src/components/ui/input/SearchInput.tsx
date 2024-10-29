import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Kbd } from "@nextui-org/react";

export const SearchInput = () => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-secondary-background",
        input: "text-sm",
      }}
      type="search"
      labelPlacement="outside"
      placeholder="Search..."
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      startContent={
        <Icon icon="mdi:search" fontSize={24} className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  )
};