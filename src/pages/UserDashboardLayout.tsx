import { useNavigate } from "react-router-dom";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HomeIcon,
  CalendarDaysIcon,
  GiftIcon,
  TruckIcon,
  InboxIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function UserDashboardLayout() {
  const [email, setEmail] = useState<string | null>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const menuItems = [
    { path: "/", icon: HomeIcon, label: "Home", badge: null },
    { path: "/user/dashboard", icon: CalendarDaysIcon, label: "Book Now", badge: null },
    { path: "/user/my-bookings", icon: CalendarDaysIcon, label: "My Bookings", badge: "3" },
    { path: "/user/holiday-packages", icon: GiftIcon, label: "Holiday Packages", badge: null },
    { path: "/user/vehicle", icon: TruckIcon, label: "Our Fleet", badge: null },
    { path: "/user/local-packages", icon: InboxIcon, label: "Local Packages", badge: null },
    { path: "/user/contact", icon: PhoneIcon, label: "Support", badge: null },
  ];

  const isActive = (path:string) => location.pathname === path;

  const getInitials = (email: string | null) => {
  if (!email) return "U";
  return email.charAt(0).toUpperCase();
};

  return (
    <div className="flex min-h-screen bg-slate-50">
    
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

     
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200/80 flex flex-col transition-all duration-300 z-50 lg:translate-x-0 shadow-xl lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
       
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-lg font-bold">V</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">Vijay Travels</span>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

       
        <div className="p-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-xl border border-slate-200/50">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-base font-semibold">{getInitials(email)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">Welcome back!</p>
              <p className="text-xs text-slate-500 truncate">{email || "user@example.com"}</p>
            </div>
          </div>
        </div>

       
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative
                    ${active 
                      ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon 
                      className={`h-5 w-5 transition-colors ${
                        active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                      }`} 
                    />
                    <span className={`text-sm font-medium ${active ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>

          
          <div className="mt-6 pt-6 border-t border-slate-200/80">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Settings
            </p>
            <Link
              to="/user/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 group"
            >
              <Cog6ToothIcon className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
              <span className="text-sm font-medium">Preferences</span>
            </Link>
          </div>
        </nav>

       
        <div className="p-4 border-t border-slate-200/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 group"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            Sign Out
          </button>
          <p className="text-xs text-slate-400 text-center mt-3">
            © 2025 Vijay Travels. All rights reserved.
          </p>
        </div>
      </aside>

      
      <div className="flex-1 lg:ml-72">
      
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3.5">
           
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl w-80 group focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search bookings, packages..."
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
                <kbd className="hidden xl:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

           
            <div className="flex items-center gap-3">
              
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

             
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{getInitials(email)}</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-slate-400 hidden sm:block" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900">Account</p>
                      <p className="text-xs text-slate-500 truncate">{email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}