import { createContext, useContext, useState, type ReactNode } from "react";

type AIWidgetContextType = {
  isOpen: boolean;
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
};

const AIWidgetContext = createContext<AIWidgetContextType | undefined>(undefined);

export function AIWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWidget = () => setIsOpen(true);
  const closeWidget = () => setIsOpen(false);
  const toggleWidget = () => setIsOpen((prev) => !prev);

  return (
    <AIWidgetContext.Provider value={{ isOpen, openWidget, closeWidget, toggleWidget }}>
      {children}
    </AIWidgetContext.Provider>
  );
}

export function useAIWidget() {
  const ctx = useContext(AIWidgetContext);
  if (!ctx) {
    throw new Error("useAIWidget must be used within an AIWidgetProvider");
  }
  return ctx;
}