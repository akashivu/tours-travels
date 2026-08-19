import { useNavigate } from "react-router-dom";

import Section from "../../ui/Section";
import Container from "../../ui/Container";

import AIHotelsVisual from "./AIHotelsVisual";

const AIHotels = () => {
  const navigate = useNavigate();

  const hotelPrompt =
    "Find a beachfront hotel in Bali for 4 nights under ₹40,000";

  const handleSearchHotels = () => {
    navigate(
      `/ai?prompt=${encodeURIComponent(hotelPrompt)}`
    );
  };

  return (
    <Section className="overflow-hidden bg-white py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">

          {/* =========================================
              LEFT CONTENT
          ========================================== */}
          <div className="max-w-sm">

            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
              AI Hotels
            </p>

            <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-gray-950">
              Find a stay
              <br />
              made for you
            </h2>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              Tell Elixway what kind of stay
              you're looking for. We'll help
              you discover options that fit
              your trip and budget.
            </p>

            {/* AI Prompt */}
            <div className="mt-7 overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

              <div className="p-5">

                <div className="flex gap-3">

                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
                    ✦
                  </span>

                  <p className="text-sm leading-6 text-gray-700">
                    Beachfront hotel in Bali
                    <br />
                    for 4 nights under ₹40,000
                  </p>

                </div>

                <button
                  type="button"
                  onClick={handleSearchHotels}
                  className="
                    ml-auto
                    mt-5
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-950
                    text-white
                    transition-all
                    duration-200
                    hover:bg-gray-800
                    hover:scale-105
                    active:scale-95
                  "
                  aria-label="Search hotels with AI"
                >
                  →
                </button>

              </div>

            </div>

            {/* AI Status */}
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">

              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-[10px]">
                ✓
              </span>

              AI finds stays around your trip

            </div>

          </div>

          {/* =========================================
              HOTEL VISUAL
          ========================================== */}
          <AIHotelsVisual />

        </div>
      </Container>
    </Section>
  );
};

export default AIHotels;