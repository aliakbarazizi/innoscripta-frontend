import { MenuItem, MenuItemProps } from "@headlessui/react";
import { Link, LinkProps } from "@tanstack/react-router";
import classNames from "classnames";
import { ReactNode } from "react";

type MenuItemType = {
  className?: string;
  children: ReactNode;
  link?: LinkProps;
} & MenuItemProps<"button">;

export default function DropDownMenuItem({
  children,
  className,
  link,
  ...props
}: MenuItemType) {
  return (
    <MenuItem
      as={link ? Link : "button"}
      {...link}
      {...props}
      className={classNames(
        "flex w-full cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 py-2.5 font-medium text-gray-700 data-focus:bg-gray-50",
        className,
      )}
    >
      {children}
    </MenuItem>
  );
}
