import { Tooltip, Button, ButtonProps } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export interface IconButtonProps extends ButtonProps {
  icon: string | React.ReactNode;
  tooltip?: string;
  iconSize?: number;
  tooltipClassName?: string;
  tooltipPlacement?: "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
}

const IconButton: React.FC<IconButtonProps> = ({ icon, tooltip, iconSize = 24, tooltipClassName, tooltipPlacement, ...props }) => {
  return (
    <Tooltip isDisabled={!tooltip} content={tooltip} placement={tooltipPlacement} className={tooltipClassName}>
      <Button {...props} isIconOnly>
        {typeof icon === "string" ? <Icon icon={icon} fontSize={iconSize} /> : icon}
      </Button>
    </Tooltip>
  );
};

export default IconButton;
