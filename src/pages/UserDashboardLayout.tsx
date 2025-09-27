import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HomeIcon,
  CalendarDaysIcon,
  GiftIcon,
  UserCircleIcon,
  TruckIcon,
  InboxIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function UserDashboardLayout() {
    const [email, setEmail] = useState<string | null>("");
    const navigate = useNavigate();

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
  return (
    <div className="flex min-h-screen bg-gray-50">
     
    <aside className="w-72 bg-gradient-to-b from-purple-600 via-indigo-700 to-indigo-900 text-white flex flex-col p-6 shadow-xl fixed top-0 left-0 h-full rounded-r-3xl">
  <div className="flex items-center gap-3 mb-12">
    <div className="bg-white p-2 rounded-xl shadow">
      <UserCircleIcon className="h-8 w-8 text-indigo-700" />
    </div>
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold">Welcome</h2>
      <p className="text-sm text-gray-300 truncate">{email}</p>
    </div>
  </div>

  <nav className="flex flex-col space-y-2">
    <Link
      to="/"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <HomeIcon className="h-5 w-5" /> Home
    </Link>
    <Link
      to="/user/dashboard"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <CalendarDaysIcon className="h-5 w-5" /> Book Now
    </Link>
    <Link
      to="/user/my-bookings"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <CalendarDaysIcon className="h-5 w-5" /> My Bookings
    </Link>
    <Link
      to="/user/holiday-packages"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <GiftIcon className="h-5 w-5" /> Holiday Packages
    </Link>
    <Link
      to="/user/vehicles"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <TruckIcon className="h-5 w-5" /> Our Vehicles
    </Link>
    <Link
      to="/user/local-packages"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <InboxIcon className="h-5 w-5" /> Local Packages
    </Link>
    <Link
      to="/user/contact"
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-600 hover:shadow-md"
    >
      <PhoneIcon className="h-5 w-5" /> Help / Contact Us
    </Link>
  </nav>

  <button
    onClick={handleLogout}
    className="mt-8 flex items-center justify-center px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
  >
    Logout
  </button>

  <div className="mt-auto text-xs text-gray-400 text-center pt-6 border-t border-gray-600">
    © 2025 Vijay Travels
  </div>
</aside>


      
     <main className="flex-1 ml-72  overflow-y-auto bg-gradient-to-br from-indigo-100 via-white to-blue-50">
        <Outlet />
      </main>

    </div>
  );
}
