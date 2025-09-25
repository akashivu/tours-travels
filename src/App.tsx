import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboardLayout from "./pages/UserDashboardLayout";
import Home from "./pages/Home";
import AdminDashboard from "./components/AdminDashboard";
import VehicleSelection from "./components/VehicleSelection";
import QuickBookingForm from "./components/QuickBookingForm";
import BookingConfirmation from "./components/BookingConfirmation";
import HolidayPackages from "./pages/HolidayPackages";
import OurVehicles from "./pages/OurVehicles";
import MyBooking from "./pages/MyBooking";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDashboardLayout />}>
          <Route path="dashboard" element={<QuickBookingForm />} />
          <Route path="dashboard" element={<h1>Dashboard Content</h1>} />
          <Route path="my-bookings" element={<MyBooking/>} />
          <Route path="vehicles" element={<OurVehicles/>} />
          <Route path="holiday-packages" element={<HolidayPackages/>} />
          <Route path="local-packages" element={<h1>Local Packages</h1>} />
          <Route path="contact" element={<ContactUs/>} />
          
        </Route>
        <Route path="/bookingform" element={<QuickBookingForm/>}/>
         <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
         <Route path="/confirmation" element={<BookingConfirmation/>}/>
          <Route path="/holiday-packages" element={<HolidayPackages />} />
          <Route path="/ourvehicles" element={<OurVehicles/>}/>
          <Route path="/my-bookings" element={<MyBooking />} />
           <Route path="/about" element={<AboutUs />} />

      </Routes>
    </BrowserRouter>
  );
}

