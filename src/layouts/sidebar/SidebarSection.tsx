type SidebarSectionProps = {
  title: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}
