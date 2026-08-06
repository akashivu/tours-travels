import { Calendar, Clock, MapPin, LogIn, Sparkles } from "lucide-react";
import { useState } from "react";
import AccountForm from "./AccountForm";
import MobileSidebar, { HamburgerIcon } from "./MobileSidebar";
import AnnouncementBar from "./AnnouncementBar";
import { useAIWidget } from "../context/AIWidgetContext";
import logo from "../assets/logo.png";

type TopBarProps = {
  expanded: boolean;
};

export default function TopBar({ expanded }: TopBarProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openWidget } = useAIWidget();

  const now = new Date();

  const date = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-14 bg-white border-b border-slate-200 z-40 transition-all duration-300 ${
          expanded ? "lg:left-64" : "lg:left-16"
        } left-0`}
      >
        {/* ---------------- MOBILE ---------------- */}
        <div className="lg:hidden h-full px-4 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h1 className="text-[15px] font-semibold text-slate-900 leading-tight">
              Elixway
            </h1>
            <p className="text-[11px] text-slate-500">Powered by Swiftov.ai</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openWidget}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Sparkles size={13} />
              Ask AI
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <HamburgerIcon size={20} className="text-slate-700" />
            </button>
          </div>
        </div>

        
        <div className="hidden lg:flex h-full px-6 items-center justify-between">
         <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="ElixWay"
    className="w-9 h-9 object-contain"
  />

  <div className="leading-tight">
    <h1 className="font-semibold text-slate-900 text-lg">
      ElixWay
    </h1>

    <p className="text-[10px] text-slate-500 tracking-wide uppercase">
      AI-Powered Travel Platform
    </p>
  </div>
</div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar size={16} />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock size={16} />
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} />
              <span>India</span>
            </div>

            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
            >
              <LogIn size={16} />
              Login
            </button>
          </div>
        </div>
      </header>

      <AnnouncementBar expanded={expanded} />

      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:text-red-500"
            >
              ✕
            </button>
            <div className="w-full max-w-md">
              <AccountForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}