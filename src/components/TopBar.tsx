import { Calendar, Clock, MapPin, Car, LogIn } from "lucide-react";
import { useState } from "react";
import AccountForm from "./AccountForm";

type TopBarProps = {
  expanded: boolean;
};

export default function TopBar({ expanded }: TopBarProps)  {
  const [showLogin, setShowLogin] = useState(false);
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
   <header
  className={`fixed top-0 right-0 h-12 bg-white border-b border-slate-200 z-40 transition-all duration-300 ${
    expanded ? "lg:left-64" : "lg:left-16"
  }`}
>
      <div className="h-full px-6 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-orange-500" />
          <div>
            <h1 className="font-semibold text-slate-900 text-lg">
              AdiyogiCabz
            </h1>
            
          </div>
        </div>

        {/* Date / Time / Location */}
        <div className="flex items-center gap-4">
  {/* Date / Time / Location */}
  <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
    <div className="flex items-center gap-2">
      <Calendar size={16} />
      <span>{date}</span>
    </div>

    <div className="flex items-center gap-2">
      <Clock size={16} />
      <span>{time}</span>
    </div>

    <div className="flex items-center gap-2">
      <MapPin size={16} />
      <span>India</span>
    </div>
  </div>

<button
  onClick={() => setShowLogin(true)}
  className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
>
  <LogIn size={16} />
  Login
</button>
</div>
      </div>
      {showLogin && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
    <div className="relative">
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-red-500"
      >
        ✕
      </button>

      <div className="w-full max-w-md">
  <AccountForm />
</div>
    </div>
  </div>
)}
    </header>
  );
}