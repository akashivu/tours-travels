import { useNavigate } from "react-router-dom";

import Section from "../../ui/Section";
import Container from "../../ui/Container";
import backgroundImage from "../../../assets/images/showcase/background2.jpg";

const TravelExperience = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/ai");
  };

  return (
    <Section className="overflow-hidden bg-[#F7F7F5] !py-0">
      <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2">

        {/* =========================================
            LEFT — CONTENT
        ========================================== */}

        <div className="flex items-center bg-[#F7F7F5]">
          <Container className="w-full py-20 lg:py-24">
            <div className="mx-auto max-w-[520px] lg:ml-auto lg:mr-12">

              {/* Eyebrow */}
              <p
                className="
                  travel-experience-content
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.24em]
                  text-gray-400
                "
              >
                Ready for your next adventure?
              </p>

              {/* Heading */}
              <h2
                className="
                  travel-experience-content
                  mt-5
                  text-5xl
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.045em]
                  text-gray-950
                  sm:text-6xl
                "
              >
                Your next journey
                <br />
                starts here.
              </h2>

              {/* Divider */}
              <div
                className="
                  travel-experience-content
                  mt-7
                  h-px
                  w-12
                  bg-gray-300
                "
              />

              {/* Description */}
              <p
                className="
                  travel-experience-content
                  mt-7
                  max-w-[460px]
                  text-base
                  leading-7
                  text-gray-500
                  sm:text-lg
                "
              >
                Tell Elixway where you want to go and
                we'll help you discover, plan and bring
                the trip together.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={handleStartPlanning}
                className="
                  travel-experience-content
                  group
                  mt-9
                  inline-flex
                  items-center
                  gap-4
                  rounded-full
                  bg-gray-950
                  px-6
                  py-3.5
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-gray-800
                "
              >
                Start planning

                <span
                  className="
                    text-lg
                    leading-none
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </button>

            </div>
          </Container>
        </div>

        {/* =========================================
            RIGHT — IMAGE
        ========================================== */}

        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
          <img
            src={backgroundImage}
            alt="Travel destination"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              transition-transform
              duration-1000
              hover:scale-[1.02]
            "
          />
        </div>

      </div>
    </Section>
  );
};

export default TravelExperience;