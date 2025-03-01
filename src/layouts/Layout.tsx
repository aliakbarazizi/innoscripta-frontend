import { HeaderContextProvivder } from "../context/HeaderContext";
import Header from "./header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderContextProvivder>
      <div className="flex h-full flex-col">
        <Header />
        {children}
      </div>
    </HeaderContextProvivder>
  );
}
