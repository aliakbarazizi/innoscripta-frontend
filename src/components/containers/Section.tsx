import classNames from "classnames";
import React, { ReactNode } from "react";

export type SectionProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  containerClassName?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

export default function Section({
  title,
  action,
  className,
  children,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <div
      className={classNames(
        "flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-xs",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-xl/6 font-semibold text-gray-900">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={containerClassName}>{children}</div>
    </div>
  );
}
