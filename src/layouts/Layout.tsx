import { HeaderContextProvivder } from "../context/HeaderContext";
import Header from "./header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderContextProvivder>
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </HeaderContextProvivder>
  );
}
