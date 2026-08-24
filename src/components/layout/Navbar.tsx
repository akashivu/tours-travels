import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, UserRound } from "lucide-react";

import Button from "../ui/Button";

import Logo from "./Logo";
import Sidebar from "../Sidebar";
import AuthModal from "../AuthModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      sidebarOpen || authOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const openAuth = () => {
    setSidebarOpen(false);
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          w-full
          transition-all
          duration-500
          ${
            scrolled
              ? "border-b border-black/[0.06] bg-white/90 shadow-[0_1px_20px_rgba(0,0,0,0.04)] backdrop-blur-2xl"
              : "bg-white/70 backdrop-blur-xl"
          }
        `}
      >
        <div
          className="
            flex
            h-[58px]
            w-full
            items-center
            justify-between
            px-3

            sm:h-[60px]
            sm:px-5

            md:px-6

            lg:h-[64px]
            lg:px-8

            xl:px-10

            2xl:px-12
          "
        >
          {/* =========================================================
              LEFT — HAMBURGER + LOGO
          ========================================================= */}
          <div
            className="
              flex
              min-w-0
              shrink
              items-center
              gap-1.5
              sm:gap-2
              md:gap-3
            "
          >
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-2xl
                text-neutral-500
                transition-all
                duration-200
                hover:bg-neutral-100
                hover:text-black
                active:scale-95
              "
            >
              <span className="flex h-[17px] w-[22px] flex-col justify-between">
                <span className="block h-[1px] w-[22px] rounded-full bg-neutral-800" />
                <span className="block h-[1px] w-[22px] rounded-full bg-neutral-800" />
                <span className="block h-[1px] w-[22px] rounded-full bg-neutral-800" />
              </span>
            </button>

            {/* Logo */}
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Elixway home"
              className="
                min-w-0
                shrink
                cursor-pointer
                overflow-hidden
                transition-opacity
                duration-200
                hover:opacity-80
              "
            >
              <Logo />
            </button>
          </div>

          {/* =========================================================
              RIGHT — ACTIONS
          ========================================================= */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-0.5
              sm:gap-1
              md:gap-2
            "
          >
            {/* =====================================================
                AI PLANNER
            ====================================================== */}
            <Button
              variant="ghost"
              onClick={() => navigate("/ai")}
              aria-label="AI Planner"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                gap-1.5
                rounded-full
                p-0
                text-neutral-700
                transition-all
                duration-200
                hover:bg-neutral-100
                hover:text-neutral-950
                active:scale-95

                sm:h-auto
                sm:w-auto
                sm:px-2.5
                sm:py-2

                md:px-3
              "
            >
              <Sparkles
                className="h-[18px] w-[18px] shrink-0"
                strokeWidth={1.8}
              />

              {/* Hidden on mobile */}
              <span
                className="
                  hidden
                  whitespace-nowrap
                  text-[13px]
                  font-medium
                  tracking-[-0.01em]
                  sm:inline
                  md:text-[14px]
                "
              >
                AI Planner
              </span>
            </Button>

            {/* =====================================================
                SIGN IN
            ====================================================== */}
            <Button
              variant="ghost"
              onClick={openAuth}
              aria-label="Sign in"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                gap-1.5
                rounded-full
                p-0
                text-neutral-600
                transition-all
                duration-200
                hover:bg-neutral-100
                hover:text-neutral-950
                active:scale-95

                sm:h-auto
                sm:w-auto
                sm:px-2.5
                sm:py-2

                md:px-3
              "
            >
              <UserRound
                className="h-[18px] w-[18px] shrink-0"
                strokeWidth={1.8}
              />

              {/* Hidden on mobile */}
              <span
                className="
                  hidden
                  whitespace-nowrap
                  text-[13px]
                  font-medium
                  tracking-[-0.01em]
                  sm:inline
                  md:text-[14px]
                "
              >
                Sign In
              </span>
            </Button>

            {/* =====================================================
                BOOK NOW
            ====================================================== */}
            <Button
              onClick={() => navigate("/bookingform")}
              className="
                ml-0.5
                rounded-full
                bg-black
                px-3.5
                py-2.5
                text-[12px]
                font-semibold
                tracking-[-0.01em]
                text-white
                shadow-[0_3px_10px_rgba(0,0,0,0.12)]
                transition-all
                duration-200
                hover:bg-neutral-800
                hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                active:scale-95

                sm:ml-1
                sm:px-4
                sm:py-2
                sm:text-[13px]

                md:px-5
                md:text-[14px]
              "
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.header>

      {/* =========================================================
          NAVIGATION DRAWER
      ========================================================= */}
      <Sidebar
        expanded={sidebarOpen}
        setExpanded={setSidebarOpen}
        onSignIn={openAuth}
      />

      {/* =========================================================
          AUTHENTICATION MODAL
      ========================================================= */}
      <AuthModal
        isOpen={authOpen}
        onClose={closeAuth}
      />
    </>
  );
};

export default Navbar;