import { Tooltip, Button, ButtonProps, TooltipProps } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export interface IconButtonProps extends ButtonProps {
  icon: string | React.ReactNode;
  tooltip?: string;
  iconSize?: number;
  tooltipClassName?: TooltipProps["className"];
  tooltipPlacement?: TooltipProps["placement"];
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  tooltip,
  iconSize = 24,
  tooltipClassName,
  tooltipPlacement,
  ...props
}) => {
  return (
    <Tooltip
      isDisabled={!tooltip}
      content={tooltip}
      placement={tooltipPlacement}
      className={tooltipClassName}
    >
      <Button {...props} isIconOnly>
        {typeof icon === "string" ? <Icon icon={icon} fontSize={iconSize} /> : icon}
      </Button>
    </Tooltip>
  );
};

export default IconButton;
