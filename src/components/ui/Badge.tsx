import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-700">
      {children}
    </span>
  );
};

export default Badge;