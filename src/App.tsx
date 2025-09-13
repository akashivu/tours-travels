import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./components/AdminDashboard";
import VehicleSelection from "./components/VehicleSelection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

