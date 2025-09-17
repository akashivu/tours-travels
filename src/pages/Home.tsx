import QuickBookingForm from "../components/QuickBookingForm";
import Navbar from "../components/Navbar";
import VehicleSelection from "../components/VehicleSelection";
export default function Home() {
  return (

      <div className="">
        <Navbar/>
        <QuickBookingForm />
        <VehicleSelection/>

      </div>
    
  );
}

