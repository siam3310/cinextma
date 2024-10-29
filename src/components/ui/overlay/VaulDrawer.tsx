"use client";

import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/button';
import { Drawer } from 'vaul';


interface DrawerProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  direction?: "right" | "top" | "bottom" | "left" | undefined;
  isOverlayBlurred?: boolean;
}

const VaulDrawer: React.FC<DrawerProps> = ({ children, trigger, direction, isOverlayBlurred }) => {
  return (
    <Drawer.Root direction={direction} shouldScaleBackground >
      <Drawer.Trigger asChild>
        <Button>
          {trigger}
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={cn("fixed inset-0 bg-black/70 z-[9998]", {
          "backdrop-blur-sm": isOverlayBlurred
        })} />
        <Drawer.Content className="text-foreground bg-secondary-background flex flex-col rounded-t-2xl mt-24 h-fit w-full max-h-[97%] fixed bottom-0 left-0 right-0 outline-none z-[9999] place-self-center">
          <div className="pt-4 pb-6 px-6 rounded-t-2xl flex-1">
            <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-foreground/50 mb-5" />
            <div className="max-w-xl mx-auto">
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default VaulDrawer