import React, { useState } from "react";

// Tipos base
interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContextProps {
  active: string;
  setActive: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | undefined>(undefined);

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [active, setActive] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// ---------- TabsList ----------
interface TabsListProps {
  children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return <div className="flex gap-2 border-b pb-2">{children}</div>;
};

// ---------- TabsTrigger ----------
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const { active, setActive } = context;

  const isActive = active === value;

  return (
    <button
      onClick={() => setActive(value)}
      className={`px-3 py-1 rounded-t transition-all ${
        isActive
          ? "bg-white border-b-2 border-blue-500 font-semibold text-blue-600"
          : "text-gray-500 hover:text-blue-500"
      }`}
    >
      {children}
    </button>
  );
};

// ---------- TabsContent ----------
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  const { active } = context;

  if (active !== value) return null;
  return <div className="mt-4">{children}</div>;
};
