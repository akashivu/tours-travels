import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SiteLayout from "./layouts/SiteLayout";
import UserDashboardLayout from "./pages/UserDashboardLayout";


import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import HolidayPackages from "./pages/HolidayPackages";
import OurVehicles from "./pages/OurVehicles";
import Booking from "./pages/Booking";
import RoutesList from "./pages/RoutesList";


import VehicleSelection from "./components/VehicleSelection";
import QuickBookingForm from "./components/QuickBookingForm";
import BookingConfirmation from "./components/BookingConfirmation";
import AdminDashboard from "./components/AdminDashboard";
import AccountForm from "./components/AccountForm";
import MyBooking from "./pages/MyBooking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/holiday-packages" element={<HolidayPackages />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
          <Route path="/vehicle" element={<OurVehicles />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingform" element={<QuickBookingForm />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Route>

       
        <Route path="/user" element={<UserDashboardLayout />}>
          <Route path="dashboard" element={<QuickBookingForm />} />
          <Route path="my-bookings" element={<MyBooking />} />
          <Route path="vehicle" element={<OurVehicles />} />
          <Route path="holiday-packages" element={<HolidayPackages />} />
          <Route path="local-packages" element={<RoutesList />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>

        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<AccountForm />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

