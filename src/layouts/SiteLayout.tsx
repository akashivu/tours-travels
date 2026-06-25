import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Footer from "../pages/Footer";
import ServiceSection from "../pages/ServiceSection";

export default function SiteLayout() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <TopBar expanded={expanded} />

      <div
        className={`pt-12 min-h-screen transition-all duration-300 ${
          expanded ? "lg:ml-64" : "lg:ml-16"
        }`}
      >
        <div className="bg-gray-50">
          <Outlet />
        </div>

        <ServiceSection />
        <Footer />
      </div>
    </div>
  );
}