import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./components/AdminDashboard";
import VehicleSelection from "./components/VehicleSelection";
import QuickBookingForm from "./components/QuickBookingForm";
import BookingConfirmation from "./components/BookingConfirmation";
import HolidayPackages from "./pages/HolidayPackages";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookingform" element={<QuickBookingForm/>}/>
         <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
         <Route path="/confirmation" element={<BookingConfirmation/>}/>
          <Route path="/holiday-packages" element={<HolidayPackages />} />
      </Routes>
    </BrowserRouter>
  );
}

