import SidebarSection from "./SidebarSection";

export default function ArticleSidebar() {
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-white p-6 shadow-md">
      <SidebarSection title="Categories">
        <ul>
          <li>Category 1</li>
          <li>Category 2</li>
          <li>Category 3</li>
        </ul>
      </SidebarSection>
      <SidebarSection title="Sources">
        <ul>
          <li>Source 1</li>
          <li>Source 2</li>
          <li>Source 3</li>
        </ul>
      </SidebarSection>
      <SidebarSection title="Authors">
        <ul>
          <li>Author 1</li>
          <li>Author 2</li>
          <li>Author 3</li>
        </ul>
      </SidebarSection>
    </div>
  );
}
