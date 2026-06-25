import QuickBookingForm from "../components/QuickBookingForm";
import OurVehicles from "./OurVehicles";
import AboutUs from "./AboutUs";
import ContactForm from "./ContactForm";
export default function Home() {
  return (
<div className="relative">
    <QuickBookingForm />
    <AboutUs/>
    <OurVehicles />
    <ContactForm/>
    
  </div>

    
  );
}

