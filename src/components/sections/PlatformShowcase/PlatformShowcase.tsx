import { useEffect, useRef, useState } from "react";
import "./PlatformShowcase.css";

const PlatformShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight =
        sectionRef.current.offsetHeight - window.innerHeight;

      if (sectionHeight <= 0) return;

      const currentProgress = Math.min(
        1,
        Math.max(0, -rect.top / sectionHeight),
      );

      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const laptopOpen = progress > 0.12;

  const flightVisible = progress > 0.25;
  const hotelVisible = progress > 0.36;
  const destinationVisible = progress > 0.47;

  const aiVisible = progress > 0.58;

  const combining = progress > 0.7;

  const bookingVisible = progress > 0.84;

  return (
    <section ref={sectionRef} className="platform-showcase">
      <div className="platform-showcase__sticky">
        <div className="platform-showcase__container">
          {/* =====================================================
              LEFT — LAPTOP EXPERIENCE
          ===================================================== */}

          <div className="platform-showcase__visual">
            <div className="laptop-scene">
              {/* Ambient glow */}
              <div className="laptop-glow" />

              {/* Laptop */}
              <div className={`laptop ${laptopOpen ? "is-open" : ""}`}>
                {/* =====================================================
                    DISPLAY
                ===================================================== */}

                <div className="laptop__display">
                  <div className="laptop__camera" />

                  <div className="laptop__screen">
                    <div className="laptop__screen-content">
                      {/* Elixway browser/header */}

                      <div className="screen-header">
                        <div className="screen-brand">
                          <span className="screen-brand__dot" />
                          <span>elixway</span>
                        </div>

                        <div className="screen-nav">
                          <span>Flights</span>
                          <span>Hotels</span>
                          <span>Destinations</span>
                          <span>AI Planner</span>
                        </div>

                        <div className="screen-actions">
                          <span className="screen-search-icon">⌕</span>
                          <span className="screen-signin">Sign in</span>
                        </div>
                      </div>

                      {/* Hero inside laptop */}

                      <div className="screen-hero">
                        <div className="screen-hero__copy">
                          <span className="screen-hero__eyebrow">
                            AI TRAVEL PLATFORM
                          </span>

                          <h3>
                            Discover your
                            <br />
                            next journey.
                          </h3>

                          <p>
                            Flights. Hotels. Destinations.
                            <br />
                            All with AI.
                          </p>
                        </div>

                        <div className="screen-hero__visual">
                          <div className="screen-mountain screen-mountain--back" />
                          <div className="screen-mountain screen-mountain--front" />

                          <div className="screen-sun" />
                        </div>
                      </div>

                      {/* Search panel */}

                      <div className="screen-trip-search">
                        <div className="screen-trip-field">
                          <span>FROM</span>
                          <strong>BLR</strong>
                          <small>Bengaluru</small>
                        </div>

                        <div className="screen-trip-arrow">→</div>

                        <div className="screen-trip-field">
                          <span>TO</span>
                          <strong>PAR</strong>
                          <small>Paris</small>
                        </div>

                        <div className="screen-trip-field">
                          <span>DATES</span>
                          <strong>12 May</strong>
                          <small>8 Nights</small>
                        </div>

                        <button>Search</button>
                      </div>

                      {/* Destination previews */}

                      <div className="screen-destinations">
                        <div className="screen-section-title">
                          <strong>Popular destinations</strong>
                          <span>View all</span>
                        </div>

                        <div className="screen-destination-grid">
                          <div className="screen-destination">
                            <div className="screen-destination__image screen-destination--paris">
                              <span>Paris</span>
                            </div>
                          </div>

                          <div className="screen-destination">
                            <div className="screen-destination__image screen-destination--bali">
                              <span>Bali</span>
                            </div>
                          </div>

                          <div className="screen-destination">
                            <div className="screen-destination__image screen-destination--tokyo">
                              <span>Tokyo</span>
                            </div>
                          </div>

                          <div className="screen-destination">
                            <div className="screen-destination__image screen-destination--swiss">
                              <span>Swiss Alps</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    LAPTOP BASE (clean, no keyboard)
                ===================================================== */}

                <div className="laptop__base">
                  <div className="laptop__hinge" />
                  <div className="laptop__trackpad" />
                </div>
              </div>

              {/* =================================================
                  FLIGHT
              ================================================= */}

              <div
                className={`travel-card travel-card--flight ${
                  flightVisible ? "is-visible" : ""
                } ${combining ? "is-combining" : ""}`}
              >
                <div className="travel-card__icon travel-card__icon--flight">
                  ✈
                </div>

                <div>
                  <span>FLIGHT</span>

                  <strong>BLR → PAR</strong>
                </div>

                <small>Found</small>
              </div>

              {/* =================================================
                  HOTEL
              ================================================= */}

              <div
                className={`travel-card travel-card--hotel ${
                  hotelVisible ? "is-visible" : ""
                } ${combining ? "is-combining" : ""}`}
              >
                <div className="travel-card__icon travel-card__icon--hotel">
                  ⌂
                </div>

                <div>
                  <span>HOTEL</span>

                  <strong>5 Nights</strong>
                </div>

                <small>Selected</small>
              </div>

              {/* =================================================
                  DESTINATION
              ================================================= */}

              <div
                className={`travel-card travel-card--destination ${
                  destinationVisible ? "is-visible" : ""
                } ${combining ? "is-combining" : ""}`}
              >
                <div className="destination-image">
                  <span>PARIS</span>
                </div>

                <div className="destination-info">
                  <span>DESTINATION</span>

                  <strong>Paris, France</strong>
                </div>
              </div>

              {/* =================================================
                  AI CONNECTION (simplified, no spinning rings)
              ================================================= */}

              <div
                className={`ai-orbit ${aiVisible ? "is-visible" : ""} ${
                  combining ? "is-combining" : ""
                }`}
              >
                <div className="ai-orbit__core">
                  <span>AI</span>
                </div>

                <div className="ai-orbit__label">PLANNING</div>
              </div>

              {/* =================================================
                  FINAL BOOKING
              ================================================= */}

              <div
                className={`booking-card ${bookingVisible ? "is-visible" : ""}`}
              >
                <div className="booking-card__check">✓</div>

                <div className="booking-card__content">
                  <span>ELIXWAY AI</span>

                  <strong>Your trip is booked.</strong>

                  <div className="booking-card__details">
                    <span className="booking-card__pill booking-card__pill--flight">
                      FLIGHT
                    </span>
                    <span className="booking-card__pill booking-card__pill--hotel">
                      HOTEL
                    </span>
                    <span className="booking-card__pill booking-card__pill--destination">
                      DESTINATION
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — STORY
          ===================================================== */}

          <div className="platform-showcase__content">
            <span className="platform-showcase__eyebrow">
              THE ELIXWAY EXPERIENCE
            </span>

            <div className="story-content">
              {/* INTRO */}

              <div className={`story-step ${progress < 0.28 ? "is-active" : ""}`}>
                <h2>
                  Meet
                  <br />
                  Elixway.
                </h2>

                <p>
                  Your intelligent travel platform built to make the entire
                  journey simpler.
                </p>
              </div>

              {/* DISCOVER */}

              <div
                className={`story-step ${
                  progress >= 0.28 && progress < 0.52 ? "is-active" : ""
                }`}
              >
                <h2>
                  Everything
                  <br />
                  in one place.
                </h2>

                <p>
                  Discover destinations, compare flights and find the right
                  stay without jumping between platforms.
                </p>
              </div>

              {/* AI */}

              <div
                className={`story-step ${
                  progress >= 0.52 && progress < 0.82 ? "is-active" : ""
                }`}
              >
                <h2>
                  Let AI
                  <br />
                  plan it.
                </h2>

                <p>
                  Elixway connects your destinations, flights and hotels into
                  one intelligent travel experience.
                </p>
              </div>

              {/* FINAL */}

              <div
                className={`story-step ${progress >= 0.82 ? "is-active" : ""}`}
              >
                <h2>
                  Your trip
                  <br />
                  is booked.
                </h2>

                <p>
                  From the first idea to the final booking, Elixway brings
                  your journey together.
                </p>
              </div>
            </div>

            {/* Progress indicators */}

            <div className="story-progress">
              <span className={progress < 0.28 ? "active" : ""} />

              <span
                className={
                  progress >= 0.28 && progress < 0.52 ? "active" : ""
                }
              />

              <span
                className={
                  progress >= 0.52 && progress < 0.82 ? "active" : ""
                }
              />

              <span className={progress >= 0.82 ? "active" : ""} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;