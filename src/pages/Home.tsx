import QuickBookingForm from "../components/QuickBookingForm";
import Navbar from "../components/Navbar";
import OurVehicles from "./OurVehicles";
import HolidayPackages from "./HolidayPackages";
export default function Home() {
  return (

      <div className="">
        <Navbar/>
        <QuickBookingForm />
        <OurVehicles/>
        <HolidayPackages/>
      </div>
    
  );
}

