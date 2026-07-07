import {
  Menu,
  Home,
  Car,
  Briefcase,
  Bot,
  Phone,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

type SidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  expanded,
  setExpanded,
}: SidebarProps) {

  const items = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Car, label: "Our Cars", path: "/vehicle" },
    { icon: Briefcase, label: "Packages", path: "/holiday-packages" },
    { icon: Bot, label: "AI Assistant", path: "/ai" },
    { icon: Phone, label: "Contact", path: "/contact" },
  ];

  return (
    <aside
  className={`hidden lg:block fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-sm z-50 transition-all duration-300 ${
    expanded ? "w-64" : "w-16"
  }`}
>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        {expanded && (
          <span className="font-semibold text-slate-900">
            AdiyogiCabz
          </span>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded hover:bg-slate-100"
        >
          {expanded ? (
            <ChevronLeft size={18} />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="py-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition"
            >
              <Icon size={20} />

              {expanded && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      {expanded && (
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-[11px] text-slate-400">
            Powered by Swiftov.ai
          </p>
        </div>
      )}
    </aside>
  );
}