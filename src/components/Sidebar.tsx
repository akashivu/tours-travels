
import {
  Home,
  Car,
  Bot,
  Phone,
  X,
  ArrowUpRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  onSignIn: () => void;
};

const Sidebar = ({
  expanded,
  setExpanded,
  onSignIn,
}: SidebarProps) => {
  const location = useLocation();

  const items = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Car,
      label: "Our Cars",
      path: "/vehicle",
    },
    
    {
      icon: Bot,
      label: "AI Assistant",
      path: "/ai",
    },
    {
      icon: Phone,
      label: "Contact",
      path: "/contact",
    },
  ];

  const closeSidebar = () => {
    setExpanded(false);
  };

  const handleSignIn = () => {
    closeSidebar();
    onSignIn();
  };

  return (
    <AnimatePresence>
      {expanded && (
        <>
          {/* =========================================
              BACKDROP
          ========================================== */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={closeSidebar}
            className="
              fixed
              inset-0
              z-[60]
              bg-black/20
              backdrop-blur-[2px]
            "
          />

          {/* =========================================
              DRAWER
          ========================================== */}
          <motion.aside
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              left-0
              top-0
              z-[70]
              flex
              h-screen
              w-[310px]
              max-w-[88vw]
              flex-col
              border-r
              border-black/[0.06]
              bg-[#fafafa]
              shadow-[12px_0_40px_rgba(0,0,0,0.08)]
            "
          >
            {/* =========================================
                HEADER
            ========================================== */}
            <div
              className="
                relative
                flex
                h-[76px]
                shrink-0
                items-center
                border-b
                border-black/[0.06]
                px-6
              "
            >
              {/* Elixway Logo + Brand Name */}
              <Link
                to="/"
                onClick={closeSidebar}
                className="
                  flex
                  items-center
                  pr-12
                  transition-opacity
                  duration-200
                  hover:opacity-75
                "
                aria-label="Elixway home"
              >
                <img
                  src="/image/elixw1.png"
                  alt="Elixway"
                  className="
                    h-[50px]
                    w-auto
                    max-w-[190px]
                    object-contain
                    object-left
                  "
                />
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeSidebar}
                aria-label="Close navigation menu"
                className="
                  absolute
                  right-5
                  top-1/2
                  flex
                  h-15
                  w-15
                  -translate-y-1/2
                  items-center
                  justify-center
                  p-0
                  text-neutral-800
                  transition-all
                  duration-200
                  hover:text-black
                  hover:opacity-60
                  active:scale-90
                "
              >
                <X
                  className="h-[23px] w-[23px]"
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* =========================================
                NAVIGATION
            ========================================== */}
            <nav className="flex-1 overflow-y-auto px-5 py-7">
              <p
                className="
                  px-3
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                "
              >
                Explore
              </p>

              <div className="mt-4 space-y-1">
                {items.map((item, index) => {
                  const Icon = item.icon;

                  const isActive =
                    location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.06 + index * 0.045,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={closeSidebar}
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-3
                          py-3
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? "bg-black text-white"
                              : "text-gray-600 hover:bg-white hover:text-gray-950"
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <Icon
                            size={18}
                            strokeWidth={1.7}
                            className={`
                              transition-transform
                              duration-200
                              ${
                                !isActive
                                  ? "group-hover:scale-105"
                                  : ""
                              }
                            `}
                          />

                          <span className="text-sm font-medium tracking-[-0.01em]">
                            {item.label}
                          </span>
                        </div>

                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.6}
                          className={`
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                            ${
                              isActive
                                ? "text-white/70"
                                : "text-gray-400"
                            }
                          `}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* =========================================
                BOTTOM AREA
            ========================================== */}
            <div
              className="
                border-t
                border-black/[0.06]
                px-5
                pb-5
                pt-5
              "
            >
              {/* Sign In Card */}
              <div
                className="
                  rounded-[20px]
                  border
                  border-black/[0.07]
                  bg-white
                  p-5
                "
              >
                <p
                  className="
                    text-[15px]
                    font-medium
                    tracking-[-0.02em]
                    text-gray-950
                  "
                >
                  Save your trips
                </p>

                <p
                  className="
                    mt-1.5
                    text-[12px]
                    leading-5
                    text-gray-500
                  "
                >
                  Sign in to pick up where you left off,
                  <br />
                  on any device.
                </p>

                <button
                  type="button"
                  onClick={handleSignIn}
                  className="
                    mt-4
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#17181c]
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-200
                    hover:bg-black
                    active:scale-[0.99]
                  "
                >
                  Sign in
                </button>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-black/[0.06]" />

              {/* Brand */}
              <Link
                to="/"
                onClick={closeSidebar}
                className="
                  flex
                  items-center
                  gap-3
                  transition-opacity
                  duration-200
                  hover:opacity-70
                "
              >
                <img
                  src="/image/elix.png"
                  alt="Elixway"
                  className="h-9 w-9 object-contain"
                />

                <div className="min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold
                      tracking-[-0.02em]
                      text-gray-950
                    "
                  >
                    Elixway
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    AI travel planning
                  </p>
                </div>
              </Link>

              {/* Legal */}
              <div className="mt-5 flex items-center gap-4">
                <Link
                  to="/terms-and-conditions"
                  onClick={closeSidebar}
                  className="
                    text-[11px]
                    text-gray-500
                    transition-colors
                    hover:text-gray-950
                  "
                >
                  Terms & Conditions
                </Link>

                <span className="h-1 w-1 rounded-full bg-gray-300" />

                <Link
                  to="/privacy-policy"
                  onClick={closeSidebar}
                  className="
                    text-[11px]
                    text-gray-500
                    transition-colors
                    hover:text-gray-950
                  "
                >
                  Privacy
                </Link>
              </div>

              {/* Copyright */}
              <p className="mt-3 text-[10px] text-gray-400">
                © 2026 Elixway
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

