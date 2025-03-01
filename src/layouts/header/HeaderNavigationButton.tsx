import { Link, LinkProps } from "@tanstack/react-router";
import classNames from "classnames";

export default function HeaderNavigationButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & LinkProps) {
  return (
    <Link
      className={classNames(
        "block cursor-pointer px-3 py-6 text-lg/1.5 font-semibold",
        "hover:bg-gray-50 hover:text-gray-900",
      )}
      activeProps={{
        className: "bg-gray-100 text-gray-900",
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
