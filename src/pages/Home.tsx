import QuickBookingForm from "../components/QuickBookingForm";
import Navbar from "../components/Navbar";
import OurVehicles from "./OurVehicles";
import HolidayPackages from "./HolidayPackages";
import Footer from "./Footer";
import ServiceSection from "./ServiceSection";
export default function Home() {
  return (
<div className="relative">
  <Navbar />
  <div className="pt-[100px]"> 
    <QuickBookingForm />
    <OurVehicles />
    <HolidayPackages />
    <ServiceSection />
    <Footer />
  </div>
</div>
    
  );
}

