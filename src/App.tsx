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
import RentalCarList from "./pages/RentalCarList";
import RentalConfirmation from "./pages/RentalConfirmation";

import AirportVehicleSelection from "./pages/AirportVehicleSelection";
import AirportBooking from "./pages/AirportBooking";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AIAssistant from "./pages/AIAssistant";
import { AIWidget } from "./components/ai/AIWidget";
import CookieBanner from "./components/CookieBanner";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/holiday-packages" element={<HolidayPackages />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
          <Route path="/airport-vehicles" element={<AirportVehicleSelection />} />
          <Route path="/vehicle" element={<OurVehicles />} />
          <Route path="/airport-booking" element={<AirportBooking />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingform" element={<QuickBookingForm />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/rental-cars" element={<RentalCarList />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/rental-confirm" element={<RentalConfirmation />} />
        
        </Route>

       
        <Route element={<ProtectedRoute />}>
  <Route path="/user" element={<UserDashboardLayout />}>
    <Route path="dashboard" element={<QuickBookingForm />} />
    <Route path="my-bookings" element={<MyBooking />} />
    <Route path="vehicle" element={<OurVehicles />} />
    <Route path="holiday-packages" element={<HolidayPackages />} />
    <Route path="local-packages" element={<RoutesList />} />

    <Route path="contact" element={<ContactUs />} />
     
  </Route>
</Route>

        
        <Route element={<AdminRoute />}>
  <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
  />
</Route>
       <Route path="/account" element={<AccountForm />} />
      </Routes>
      <AIWidget />
      <CookieBanner />
     <Toaster
  position="top-center"
  toastOptions={{
    duration: 4000,
    style: {
      background: "#333",       
      color: "#fff",           
      fontSize: "15px",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "12px 16px",
    },
    success: {
      style: { background: "#16a34a" }, 
    },
    error: {
      style: { background: "#dc2626" },
    },
  }}
/>

    </BrowserRouter>
  );
}

