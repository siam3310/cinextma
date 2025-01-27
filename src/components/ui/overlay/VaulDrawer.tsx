"use client";

import { cn } from "@/utils/helpers";
import { Button } from "@heroui/button";
import { Drawer, DialogProps } from "vaul";

type DrawerProps = DialogProps & {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  backdrop?: "opaque" | "blur" | "transparent";
  fullWidth?: boolean;
  hiddenTitle?: boolean;
};

export default function VaulDrawer({
  children,
  trigger,
  title,
  backdrop = "opaque",
  fullWidth,
  hiddenTitle,
  ...props
}: DrawerProps) {
  return (
    <Drawer.Root {...props}>
      {trigger && (
        <Drawer.Trigger asChild>
          {typeof trigger === "string" ? <Button>{trigger}</Button> : trigger}
        </Drawer.Trigger>
      )}
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn("fixed inset-0 z-[9998] bg-black/70", {
            "backdrop-blur-sm": backdrop === "blur",
            "bg-transparent": backdrop === "transparent",
          })}
        />
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[9999] mt-24 grid h-fit max-h-[97%] w-full place-self-center rounded-t-2xl bg-secondary-background text-foreground outline-none",
            {
              "md:w-max": !fullWidth,
            },
          )}
        >
          <div className="flex-1 space-y-5 rounded-t-2xl pb-6 pt-4">
            <div
              aria-hidden
              className="mx-auto h-1.5 w-12 flex-shrink-0 rounded-full bg-foreground/50"
            />
            <Drawer.Title
              aria-hidden={hiddenTitle}
              className={cn("text-center text-xl", {
                hidden: hiddenTitle,
              })}
            >
              {title}
            </Drawer.Title>
            <Drawer.Description aria-hidden className="hidden" />
            <div className="mx-auto max-w-lg">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
