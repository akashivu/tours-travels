import QuickBookingForm from "../components/QuickBookingForm";
import Navbar from "../components/Navbar";
import OurVehicles from "./OurVehicles";
import HolidayPackages from "./HolidayPackages";
import Footer from "./Footer";
import ServiceSection from "./ServiceSection";
import AboutUs from "./AboutUs";
import ContactForm from "./ContactForm";
import RoutesList from "./RoutesList"
export default function Home() {
  return (
<div className="relative">
  <Navbar />
  <div className="pt-[100px]"> 
    <QuickBookingForm />
    <AboutUs/>
    <OurVehicles />
    <HolidayPackages />
    <ContactForm/>
    <RoutesList/>
    <ServiceSection />
    <Footer />
  </div>
</div>
    
  );
}

