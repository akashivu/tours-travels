import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import RoutesList from "../pages/RoutesList";
import ServiceSection from "../pages/ServiceSection";

export default function SiteLayout() {
  return (
    <div className="relative">
      <Navbar />
      <div className="pt-[100px] min-h-screen bg-gray-50">
       
        <Outlet />
      </div>
       <RoutesList />
       <ServiceSection/>
      <Footer />
    </div>
  );
}
