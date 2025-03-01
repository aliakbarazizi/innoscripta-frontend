import { Menu, MenuButton, MenuItems, MenuItemsProps } from "@headlessui/react";
import classNames from "classnames";
import { ReactNode } from "react";

export interface DropDownMenuProps extends MenuItemsProps {
  button: ReactNode;
  className?: string;
}

export default function DropDownMenu({
  button,
  className,
  ...props
}: DropDownMenuProps) {
  return (
    <Menu as="div" className="flex w-full">
      <MenuButton as="div">{button}</MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className={classNames(
          "origin-top-start z-20 mt-4 min-w-[var(--button-width)] rounded-lg border border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-lg transition duration-100 ease-out focus:outline-hidden data-closed:scale-95 data-closed:opacity-0",
          className,
        )}
        {...props}
      />
    </Menu>
  );
}
