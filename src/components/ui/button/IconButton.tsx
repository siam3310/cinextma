"use client";

import { Tooltip, Button, ButtonProps } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";

interface IconButtonProps extends ButtonProps {
  iconName: string,
  tooltip?: string,
  tooltipPlacement?: "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end",
  iconSize?: number,
}

export const IconButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <Tooltip isDisabled={props.tooltip === undefined} content={props.tooltip} placement={props.tooltipPlacement}>
      <Button isIconOnly radius={props.radius} onPress={props.onPress} size={props.size} color={props.color} variant={props.variant} className={props.className}>
        <Icon icon={props.iconName} fontSize={props.iconSize ?? 24} />
      </Button>
    </Tooltip>
  );
};
