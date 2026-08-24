import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
export default function FlightResultsLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full min-w-0">
        <Outlet />
      </main>
    </div>
  );
}