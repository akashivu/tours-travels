import QuickBookingForm from "../components/QuickBookingForm";
import Navbar from "../components/Navbar";
import OurVehicles from "./OurVehicles";
export default function Home() {
  return (

      <div className="">
        <Navbar/>
        <QuickBookingForm />
        <OurVehicles/>
      </div>
    
  );
}

