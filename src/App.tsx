import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { AIWidgetProvider } from "./context/AIWidgetContext";

import SiteLayout from "./layouts/SiteLayout";
import FlightResultsLayout from "./layouts/FlightResultsLayout";
import UserDashboardLayout from "./pages/UserDashboardLayout";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import HolidayPackages from "./pages/HolidayPackages";
import OurVehicles from "./pages/OurVehicles";
import Booking from "./pages/Booking";
import RoutesList from "./pages/RoutesList";

import VehicleSelection from "./components/VehicleSelection";
import QuickBookingForm from "./components/QuickBookingForm";
import BookingConfirmation from "./components/BookingConfirmation";
import AdminDashboard from "./components/AdminDashboard";
import AccountForm from "./components/AccountForm";
import MyBooking from "./pages/MyBooking";
import RentalCarList from "./pages/RentalCarList";
import RentalConfirmation from "./pages/RentalConfirmation";

import AirportVehicleSelection from "./pages/AirportVehicleSelection";
import AirportBooking from "./pages/AirportBooking";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AIAssistant from "./pages/AIAssistant";

import WebsiteAIChat from "./components/ai/WebsiteAIChat";
import CookieBanner from "./components/CookieBanner";

import DestinationDetails from "./pages/DestinationDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HotelResults from "./pages/HotelResults";
import FlightResultsPage from "./pages/FlightResultsPage";


function AppContent() {
  const location = useLocation();

  /*
   * =========================================================
   * HIDE WEBSITE AI ON SPECIAL PAGES
   * =========================================================
   */

  const hideWebsiteAI =
    location.pathname === "/ai" ||
    location.pathname.startsWith("/ai/") ||
    location.pathname === "/flights";


  return (
    <>
      <Routes>

        {/* =====================================================
            FLIGHT RESULTS
            =====================================================

            IMPORTANT:

            Flight results do NOT use SiteLayout.

            They use a dedicated layout containing ONLY
            the Elixway navbar.

            This prevents:

            - SiteLayout container restrictions
            - homepage spacing
            - rounded page cards
            - homepage background
            - duplicate navbar
            - Travelpayouts CSS affecting SiteLayout
        ===================================================== */}

        <Route element={<FlightResultsLayout />}>

          <Route
            path="/flights"
            element={<FlightResultsPage />}
          />

        </Route>


        {/* =====================================================
            ELIXWAY WEBSITE
        ===================================================== */}

        <Route element={<SiteLayout />}>

          <Route
            path="/"
            element={<Home />}
          />
<Route
  path="/hotels"
  element={<HotelResults />}
/>
          <Route
            path="/destinations/:slug"
            element={<DestinationDetails />}
          />

          <Route
            path="/about"
            element={<AboutUs />}
          />

          <Route
            path="/contact"
            element={<ContactUs />}
          />

          <Route
            path="/ai"
            element={<AIAssistant />}
          />

          <Route
            path="/holiday-packages"
            element={<HolidayPackages />}
          />

          <Route
            path="/vehicles"
            element={<VehicleSelection />}
          />

          <Route
            path="/airport-vehicles"
            element={<AirportVehicleSelection />}
          />

          <Route
            path="/vehicle"
            element={<OurVehicles />}
          />

          <Route
            path="/airport-booking"
            element={<AirportBooking />}
          />

          <Route
            path="/booking"
            element={<Booking />}
          />

          <Route
            path="/bookingform"
            element={<QuickBookingForm />}
          />

          <Route
            path="/confirmation"
            element={<BookingConfirmation />}
          />

          <Route
            path="/rental-cars"
            element={<RentalCarList />}
          />

          <Route
            path="/rental-confirm"
            element={<RentalConfirmation />}
          />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route
            path="/cookie-policy"
            element={<CookiePolicy />}
          />

        </Route>


        {/* =====================================================
            USER DASHBOARD
        ===================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/user"
            element={<UserDashboardLayout />}
          >

            <Route
              path="dashboard"
              element={<QuickBookingForm />}
            />

            <Route
              path="my-bookings"
              element={<MyBooking />}
            />

            <Route
              path="vehicle"
              element={<OurVehicles />}
            />

            <Route
              path="holiday-packages"
              element={<HolidayPackages />}
            />

            <Route
              path="local-packages"
              element={<RoutesList />}
            />

            <Route
              path="contact"
              element={<ContactUs />}
            />

          </Route>

        </Route>


        {/* =====================================================
            ADMIN
        ===================================================== */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

        </Route>


        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <Route
          path="/account"
          element={<AccountForm />}
        />

      </Routes>


      {/* =======================================================
          WEBSITE AI
      ======================================================= */}

      {!hideWebsiteAI && (
        <WebsiteAIChat />
      )}


      {/* =======================================================
          COOKIE
      ======================================================= */}

      <CookieBanner />


      {/* =======================================================
          TOASTER
      ======================================================= */}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,

          style: {
            background: "#333",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px",
          },

          success: {
            style: {
              background: "#16a34a",
            },
          },

          error: {
            style: {
              background: "#dc2626",
            },
          },
        }}
      />

    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>

      <AIWidgetProvider>

        <AppContent />

      </AIWidgetProvider>

    </BrowserRouter>
  );
}