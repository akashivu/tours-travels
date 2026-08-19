
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
  }, [sidebarOpen, authOpen]);

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
            h-12
            w-full
            items-center
            justify-between
            px-4

            sm:h-[54px]
            sm:px-6

            lg:h-[60px]
            lg:px-8

            xl:px-10
            2xl:px-12
          "
        >
          {/* =========================================================
              LEFT — HAMBURGER + LOGO
          ========================================================= */}
          <div className="flex shrink-0 items-center gap-3">
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
    p-0
    text-neutral-800
    transition-opacity
    duration-200
    hover:opacity-60
    active:opacity-40
  "
>
  <span className="flex h-[18px] w-[24px] flex-col justify-between">
    <span className="block h-[2px] w-[24px] bg-neutral-800" />
    <span className="block h-[2px] w-[24px] bg-neutral-800" />
    <span className="block h-[2px] w-[24px] bg-neutral-800" />
  </span>
</button>

            {/* Logo */}
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Elixway home"
              className="
                shrink-0
                cursor-pointer
                transition-opacity
                duration-200
                hover:opacity-80
              "
            >
              <Logo />
            </button>
          </div>
{/* RIGHT — ACTIONS */}
<div className="flex shrink-0 items-center gap-2 sm:gap-3">

  {/* Plan with AI */}
 <Button
  variant="ghost"
  onClick={() => navigate("/ai")}
  className="
    flex
    items-center
    gap-1.5
    rounded-full
    px-3
    py-2
    text-[14px]
    font-medium
    tracking-[-0.01em]
    text-neutral-700
    transition-all
    duration-200
    hover:bg-neutral-100
    hover:text-neutral-950
    active:scale-[0.98]
  "
>
  <Sparkles
    className="h-[17px] w-[17px]"
    strokeWidth={1.8}
  />

  <span className="whitespace-nowrap">
    AI Planner
  </span>
</Button>

  {/* Sign In */}
  <Button
    variant="ghost"
    onClick={openAuth}
    className="
      flex
      items-center
      gap-1.5
      rounded-full
      px-3
      py-2
      text-[14px]
      font-medium
      tracking-[-0.01em]
      text-neutral-600
      transition-all
      duration-200
      hover:bg-neutral-100
      hover:text-neutral-950
      active:scale-[0.98]
    "
  >
    <UserRound
      className="h-[17px] w-[17px]"
      strokeWidth={1.8}
    />

    <span className="whitespace-nowrap">
      Sign In
    </span>
  </Button>

  {/* Book Now */}
  <Button
    onClick={() => navigate("/book")}
    className="
      rounded-full
      bg-black
      px-5
      py-2
      text-[14px]
      font-semibold
      tracking-[-0.01em]
      text-white
      shadow-[0_3px_10px_rgba(0,0,0,0.12)]
      transition-all
      duration-200
      hover:bg-neutral-800
      hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)]
      active:scale-[0.98]
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





