import { useEffect, useState } from "react";
import { X, Home, Car, Plane, Briefcase, Phone, Sparkles, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAIWidget } from "../context/AIWidgetContext";
import AccountForm from "./AccountForm";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Car, label: "Vehicles", path: "/vehicle" },
  { icon: Plane, label: "Airport", path: "/airport-vehicles" },
  { icon: Briefcase, label: "Holiday Packages", path: "/holiday-packages" },
  { icon: Phone, label: "Contact", path: "/contact" },
];

// Guaranteed three-bar hamburger icon, independent of lucide-react's Menu glyph
export function HamburgerIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const { openWidget } = useAIWidget();
  const [showLogin, setShowLogin] = useState(false);

  // Lock body scroll while menu OR login modal is open
  useEffect(() => {
    if (open || showLogin) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open, showLogin]);

  const handleAskAI = () => {
    onClose();
    openWidget();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[200] bg-white transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "100vw", height: "100vh" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col">
          {/* Top */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 shrink-0">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <div className="text-right">
              <h2 className="font-semibold text-[15px] text-slate-900 leading-tight">
                AdiyogiCabz
              </h2>
              <p className="text-[11px] text-slate-500">Powered by Swiftov.ai</p>
            </div>
          </div>

          {/* Middle: nav */}
          <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={19} strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="shrink-0 border-t border-slate-100 px-5 py-4">
            <button
              onClick={handleAskAI}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <Sparkles size={19} className="text-slate-500" strokeWidth={2} />
              <div>
                <div className="text-[15px] font-medium text-slate-900">Ask AI</div>
                <div className="text-[11px] text-slate-500">Powered by Swiftov.ai</div>
              </div>
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="mt-2 w-full flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <LogIn size={19} strokeWidth={2} />
              Login / Account
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal — premium centered sheet, no page navigation */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            onClick={() => setShowLogin(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />

          {/* Sheet */}
          <div className="relative w-full max-w-sm animate-[scaleIn_0.2s_ease-out]">
            <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 h-14 border-b border-slate-100">
                <span className="text-[14px] font-semibold text-slate-900">
                  Login / Account
                </span>
                <button
                  onClick={() => setShowLogin(false)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-slate-500" />
                </button>
              </div>

              <div className="p-5">
                <AccountForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}