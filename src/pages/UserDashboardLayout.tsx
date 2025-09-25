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
     
     <aside className="w-72 bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 text-white flex flex-col p-6 shadow-lg fixed top-0 left-0 h-full">
       
        <div className="flex items-center gap-3 mb-10">
          <div className="flex flex-col bg-white p-2 rounded-lg">
            <UserCircleIcon className="h-7 w-7 text-indigo-700" />
         </div>
  <div className="flex flex-col">
    <h2 className="text-2xl font-bold tracking-wide">Welcome</h2>
    <h2 className="text-sm font-medium text-gray-700">{email}</h2>
  </div>
</div>

        
        <nav className="flex flex-col space-y-3 text-sm font-medium">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <HomeIcon className="h-5 w-5" /> Home
          </Link>
          <Link
            to="/user/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <CalendarDaysIcon className="h-5 w-5" /> Book Now
          </Link>
          <Link
            to="/user/my-bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <CalendarDaysIcon className="h-5 w-5" /> My Bookings
          </Link>
          <Link
            to="/user/holiday-packages"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <GiftIcon className="h-5 w-5" /> Holiday Packages
          </Link>
          <Link
            to="/user/vehicles"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <TruckIcon className="h-5 w-5" /> Our Vehicles
          </Link>
          <Link
            to="/user/local-packages"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <InboxIcon className="h-5 w-5" /> Local Packages
          </Link>
          <Link
            to="/user/contact"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            <PhoneIcon className="h-5 w-5" /> Help / Contact Us
          </Link>
        </nav>
        <button
           onClick={handleLogout}
           className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium mt-6"
            >
             Logout
             </button>
      
        <div className="mt-auto text-xs text-gray-300 text-center pt-6 border-t border-indigo-600">
          © 2025 Vijay Travels  
        </div>
      </aside>

      
     <main className="flex-1 ml-72  overflow-y-auto bg-gradient-to-br from-indigo-100 via-white to-blue-50">
        <Outlet />
      </main>

    </div>
  );
}
