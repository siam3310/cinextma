import { signOut } from "@/app/auth/actions";
import useBreakpoints from "@/hooks/useBreakpoints";
import useSupabaseUser from "@/hooks/useSupabaseUser";
import { DropdownItemProps } from "@/types/component";
import { Gear, Logout, User } from "@/utils/icons";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { useMemo, useState } from "react";

const UserProfileButton: React.FC = () => {
  const [logout, setLogout] = useState(false);
  const { data: user, isLoading } = useSupabaseUser();
  const { mobile } = useBreakpoints();

  const ITEMS: DropdownItemProps[] = useMemo(
    () => [
      { label: "Profile", href: "/profile", icon: <User /> },
      { label: "Settings", href: "/settings", icon: <Gear /> },
      {
        label: "Logout",
        onClick: () => {
          if (logout) return;
          setLogout(true);
          signOut();
        },
        icon: logout ? <Spinner size="sm" color="danger" /> : <Logout />,
        color: "danger",
        className: "text-danger",
      },
    ],
    [logout],
  );

  if (isLoading) return null;

  const guest = !user;
  const avatar = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user?.email}`;

  const ProfileButton = (
    <Button
      title={guest ? "Login" : user.username}
      variant="light"
      href={guest ? "/auth" : undefined}
      as={guest ? Link : undefined}
      isIconOnly={guest || mobile}
      endContent={!guest ? <Avatar src={avatar} className="size-7" /> : undefined}
      className="min-w-fit"
    >
      {guest ? (
        <User className="text-xl" />
      ) : (
        <p className="hidden max-w-32 truncate md:block lg:max-w-56">{user.username}</p>
      )}
    </Button>
  );

  if (guest) return ProfileButton;

  return (
    <Dropdown showArrow closeOnSelect={false} className="w-10">
      <DropdownTrigger className="w-10">{ProfileButton}</DropdownTrigger>
      <DropdownMenu aria-label="User profile dropdown" variant="flat">
        {ITEMS.map(({ label, icon, ...props }) => (
          <DropdownItem key={label} startContent={icon} {...props}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfileButton;
