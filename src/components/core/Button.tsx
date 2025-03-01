import classNames from "classnames";

import Loading from "../helper/Loading";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

const variants = {
  primary:
    "border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
};

export default function Button({
  className,
  variant = "primary",
  children,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "cursor-pointer rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none",
        variants[variant],
        loading && "pointer-events-none relative opacity-75",
      )}
    >
      {children}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading className="z-10 size-5 text-blue-600" />
        </div>
      )}
    </button>
  );
}
