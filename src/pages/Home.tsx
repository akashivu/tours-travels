import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import QuickBookingForm from "../components/QuickBookingForm";

import AIPlanner from "../components/sections/AIPlanner";
import Destinations from "../components/sections/Destinations/Destinations";

import FAQSection from "./FAQ/FAQSection";

import TravelStyles from "../components/sections/TravelStyles/TravelStyles";

const NAVBAR_OFFSET = 80;

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const sectionId = location.hash.replace("#", "");

    const timer = window.setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (!element) {
        return;
      }

      const position =
        element.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_OFFSET;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.hash]);

  return (
    <main
      className="
        w-full
        max-w-full
        overflow-x-hidden
        pt-10
      "
    >
      {/* Cabs */}
      <section
        id="cabs"
        className="
          w-full
          max-w-full
          scroll-mt-24
        "
      >
        <QuickBookingForm />
      </section>

      <section
        id="destinations"
        className="
          w-full
          max-w-full
          scroll-mt-20
        "
      >
        <Destinations />
      </section>

      <div className="w-full max-w-full">
        <TravelStyles />
      </div>

      {/* AI Planner */}
      <section
        id="ai-planner"
        className="
          w-full
          max-w-full
          scroll-mt-24
        "
      >
        <AIPlanner />
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="
          w-full
          max-w-full
          scroll-mt-24
        "
      >
        <FAQSection />
      </section>
    </main>
  );
};

export default Home;