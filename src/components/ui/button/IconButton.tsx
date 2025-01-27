import { Tooltip, Button, ButtonProps, TooltipProps } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface IconButtonProps extends Omit<ButtonProps, "isIconOnly"> {
  icon: string | React.ReactNode;
  tooltip?: string;
  iconSize?: number;
  tooltipProps?: Omit<TooltipProps, "isDisabled" | "content" | "children">;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  tooltip,
  iconSize = 24,
  tooltipProps,
  ...props
}) => {
  return (
    <Tooltip isDisabled={!tooltip} content={tooltip} {...tooltipProps}>
      <Button {...props} isIconOnly>
        {typeof icon === "string" ? <Icon icon={icon} fontSize={iconSize} /> : icon}
      </Button>
    </Tooltip>
  );
};

export default IconButton;
