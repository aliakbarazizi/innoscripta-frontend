import React, { ReactNode, createContext, useContext, useState } from "react";

interface HeaderContext {
  component: ReactNode;
  setComponent: (component: ReactNode) => void;
}

const HeaderContext = createContext<HeaderContext | null>(null);

export const HeaderContextProvivder: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [component, setComponent] = useState<ReactNode | null>(null);

  return (
    <HeaderContext.Provider value={{ component, setComponent }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderContext");
  }

  return context;
};
