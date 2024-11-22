import { Tooltip, Button, ButtonProps } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";

export interface IconButtonProps extends ButtonProps {
  icon: string | React.ReactNode;
  text?: string;
  tooltip?: string;
  iconSize?: number;
  buttonClassName?: string;
  tooltipClassName?: string;
  tooltipPlacement?: "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  tooltip,
  iconSize,
  isDisabled,
  buttonClassName,
  tooltipClassName,
  tooltipPlacement,
  onPress,
  onClick,
  radius,
  size,
  color,
  variant,
  as,
}) => {
  return (
    <Tooltip isDisabled={!tooltip} content={tooltip} placement={tooltipPlacement} className={tooltipClassName}>
      <Button as={as} isDisabled={isDisabled} isIconOnly={!text} radius={radius} onPress={onPress} onClick={onClick} size={size} color={color} variant={variant} className={buttonClassName}>
        {typeof icon === "string" ? <Icon icon={icon} fontSize={iconSize ?? 24} /> : icon} {text}
      </Button>
    </Tooltip>
  );
};
