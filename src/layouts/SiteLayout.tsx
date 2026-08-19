import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer/Footer";
import TravelExperience from "../components/sections/TravelExperience/TravelExperience";

export default function SiteLayout() {
  const location = useLocation();

  /*
   * =========================================================
   * AI WORKSPACE
   * =========================================================
   *
   * The AI workspace is a completely separate application.
   *
   * It does NOT inherit:
   * - Navbar
   * - TravelExperience
   * - Footer
   * - Website spacing
   */

  const isAIWorkspace =
    location.pathname === "/ai" ||
    location.pathname.startsWith("/ai/");

  /*
   * =========================================================
   * AI WORKSPACE
   * =========================================================
   */

  if (isAIWorkspace) {
    return (
      <div
        className="
          flex
          h-[100dvh]
          min-h-0
          w-full
          flex-col
          overflow-hidden
        "
        style={{
          background: "var(--ai-canvas)",
        }}
      >
        <Outlet />
      </div>
    );
  }

  /*
   * =========================================================
   * ELIXWAY V2 WEBSITE
   * =========================================================
   *
   * Structure:
   *
   * New Navbar
   *     ↓
   * Page Content
   *     ↓
   * Travel Experience
   *     ↓
   * New Footer
   */

  return (
    <div className="min-h-screen bg-white">

      {/* New Elixway Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* New Travel Experience */}
      <TravelExperience />

      {/* New Footer */}
      <Footer />

    </div>
  );
}