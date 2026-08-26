import { useEffect, useState } from "react";
import { initAnalytics, disableAnalytics } from "../utils/analytics";
import {
  COOKIE_EVENT,
  COOKIE_STORAGE_KEY,
} from "../utils/cookie";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  X,
  Settings2,
} from "lucide-react";

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
};

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] =
    useState(false);

  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const saved = localStorage.getItem(
      COOKIE_STORAGE_KEY
    );

    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        const parsed: CookiePreferences =
          JSON.parse(saved);

        setPreferences(parsed);

        if (parsed.analytics) {
          initAnalytics();
        } else {
          disableAnalytics();
        }
      } catch {
        setIsVisible(true);
      }
    }

    const handler = () => {
      const saved = localStorage.getItem(
        COOKIE_STORAGE_KEY
      );

      if (saved) {
        try {
          const parsed = JSON.parse(
            saved
          ) as CookiePreferences;

          setPreferences(parsed);
        } catch {
          setPreferences(defaultPreferences);
        }
      }

      setIsVisible(true);
      setShowPreferences(true);
    };

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setShowPreferences(false);
      }
    };

    window.addEventListener(
      COOKIE_EVENT,
      handler
    );

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        COOKIE_EVENT,
        handler
      );

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      showPreferences ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreferences]);

  const savePreferences = (
    prefs: CookiePreferences
  ) => {
    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify(prefs)
    );

    if (prefs.analytics) {
      initAnalytics();
    } else {
      disableAnalytics();
    }

    setPreferences(prefs);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const acceptAll = () =>
    savePreferences({
      essential: true,
      analytics: true,
    });

  const rejectOptional = () =>
    savePreferences({
      essential: true,
      analytics: false,
    });

  if (!isVisible) return null;

  return (
    <>
      {/* =====================================================
          COOKIE BANNER
      ====================================================== */}
      <div
        className="
          fixed
          bottom-3
          left-3
          right-3
          z-[9999]

          sm:bottom-5
          sm:left-5
          sm:right-5

          lg:bottom-6
          lg:left-6
          lg:right-6
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/10
            bg-[#123f7c]
            shadow-[0_18px_45px_rgba(10,38,78,0.28)]

            lg:rounded-[18px]
          "
        >
          {/* Subtle background glow */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
            "
            style={{
              background:
                "radial-gradient(circle at 85% 0%, rgba(63,130,220,0.28), transparent 38%), radial-gradient(circle at 15% 100%, rgba(0,0,0,0.12), transparent 45%)",
            }}
          />

          {/* =================================================
              CONTENT
          ================================================== */}
          <div
            className="
              relative
              flex
              flex-col
              gap-7
              px-5
              py-6

              sm:px-7
              sm:py-7

              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-10
              lg:px-10
              lg:py-10
            "
          >
            {/* =============================================
                LEFT — ICON + CONTENT
            ============================================== */}
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-5

                sm:flex-row
                sm:items-start
                sm:gap-6
              "
            >
              {/* Shield Icon */}
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.06]
                  bg-white/[0.08]

                  sm:h-[68px]
                  sm:w-[68px]
                "
              >
                <ShieldCheck
                  size={34}
                  strokeWidth={1.6}
                  className="text-white"
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h2
                  className="
                    text-[23px]
                    font-semibold
                    tracking-[-0.025em]
                    text-white

                    sm:text-[27px]
                  "
                >
                  We value your privacy
                </h2>

                <p
                  className="
                    mt-2.5
                    max-w-[540px]
                    text-[14px]
                    leading-7
                    text-white/80

                    sm:text-[16px]
                    sm:leading-8
                  "
                >
                  We use cookies to ensure the website works
                  properly and, with your consent, to understand
                  how you use it and improve your experience.
                </p>

                {/* Policy links */}
                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    text-[13px]

                    sm:text-[15px]
                  "
                >
                  <Link
                    to="/privacy-policy"
                    className="
                      font-medium
                      text-white/85
                      underline
                      decoration-white/40
                      underline-offset-4
                      transition-colors
                      hover:text-white
                    "
                  >
                    Privacy Policy
                  </Link>

                  <span className="text-white/60">
                    •
                  </span>

                  <Link
                    to="/cookie-policy"
                    className="
                      font-medium
                      text-white/85
                      underline
                      decoration-white/40
                      underline-offset-4
                      transition-colors
                      hover:text-white
                    "
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* =============================================
                RIGHT — ACTIONS
            ============================================== */}
            <div
              className="
                flex
                w-full
                flex-col
                gap-2.5

                sm:flex-row
                sm:flex-wrap
                sm:items-center

                lg:w-auto
                lg:flex-nowrap
              "
            >
              {/* Manage preferences */}
              <button
                type="button"
                onClick={() => {
                  setIsVisible(true);
                  setShowPreferences(true);
                }}
                className="
                  inline-flex
                  min-h-[48px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4
                  text-[13px]
                  font-semibold
                  text-white/90
                  transition-all
                  duration-200
                  hover:bg-white/[0.08]
                  hover:text-white
                  active:scale-[0.98]
                  whitespace-nowrap

                  sm:min-h-0
                  sm:px-3
                "
              >
                <Settings2
                  size={16}
                  strokeWidth={1.8}
                  className="sm:hidden"
                />

                <span
                  className="
                    border-b
                    border-dashed
                    border-white/50
                    pb-1
                  "
                >
                  Manage preferences
                </span>
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={rejectOptional}
                className="
                  min-h-[50px]
                  rounded-xl
                  border
                  border-white/70
                  bg-transparent
                  px-6
                  text-[14px]
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:border-white
                  hover:bg-white/[0.10]
                  active:scale-[0.98]
                  whitespace-nowrap
                "
              >
                Reject optional
              </button>

              {/* Accept */}
              <button
                type="button"
                onClick={acceptAll}
                className="
                  min-h-[50px]
                  rounded-xl
                  bg-white
                  px-7
                  text-[14px]
                  font-semibold
                  text-[#1c4f91]
                  shadow-[0_4px_14px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-neutral-50
                  hover:shadow-[0_7px_20px_rgba(0,0,0,0.18)]
                  active:translate-y-0
                  active:scale-[0.98]
                  whitespace-nowrap
                "
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PREFERENCES MODAL
      ====================================================== */}
      {showPreferences && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onClick={() =>
            setShowPreferences(false)
          }
        >
          <div
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            {/* Blue header accent */}
            <div className="h-1 w-full bg-[#1c4f91]" />

            {/* Modal header */}
            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-neutral-100
                px-5
                pb-4
                pt-5
                sm:px-6
              "
            >
              <div>
                <h2
                  id="cookie-modal-title"
                  className="
                    text-[18px]
                    font-semibold
                    tracking-[-0.02em]
                    text-neutral-900
                  "
                >
                  Cookie Preferences
                </h2>

                <p className="mt-1 text-[12px] text-neutral-500">
                  Choose what you allow us to store.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPreferences(false)
                }
                aria-label="Close preferences"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-neutral-400
                  transition-colors
                  hover:bg-neutral-100
                  hover:text-neutral-900
                "
              >
                <X
                  size={17}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* Cookie rows */}
            <div className="space-y-1 px-5 py-4 sm:px-6">
              {/* Essential */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-neutral-100
                  py-4
                "
              >
                <div>
                  <p className="text-[14px] font-semibold text-neutral-800">
                    Essential
                  </p>

                  <p className="mt-1 text-[12px] leading-5 text-neutral-500">
                    Required for security and bookings.
                    Always on.
                  </p>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-neutral-100
                    px-3
                    py-1.5
                    text-[11px]
                    font-medium
                    text-neutral-500
                  "
                >
                  Always on
                </span>
              </div>

              {/* Analytics */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-4
                "
              >
                <div>
                  <label
                    htmlFor="analytics-cookie"
                    className="
                      cursor-pointer
                      text-[14px]
                      font-semibold
                      text-neutral-800
                    "
                  >
                    Analytics
                  </label>

                  <p className="mt-1 text-[12px] leading-5 text-neutral-500">
                    Helps us improve using Microsoft Clarity.
                  </p>
                </div>

                <button
                  type="button"
                  id="analytics-cookie"
                  role="switch"
                  aria-checked={
                    preferences.analytics
                  }
                  onClick={() =>
                    setPreferences((previous) => ({
                      ...previous,
                      analytics:
                        !previous.analytics,
                    }))
                  }
                  className={`
                    relative
                    inline-flex
                    h-6
                    w-11
                    shrink-0
                    cursor-pointer
                    rounded-full
                    border-2
                    border-transparent
                    transition-colors
                    duration-200
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#1c4f91]
                    focus-visible:ring-offset-2
                    ${
                      preferences.analytics
                        ? "bg-[#1c4f91]"
                        : "bg-neutral-200"
                    }
                  `}
                >
                  <span
                    className={`
                      pointer-events-none
                      inline-block
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-transform
                      duration-200
                      ${
                        preferences.analytics
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                    `}
                  />
                </button>
              </div>
            </div>

            {/* Policy note */}
            <p
              className="
                px-5
                pb-4
                text-[11px]
                leading-relaxed
                text-neutral-400
                sm:px-6
              "
            >
              By saving, you agree to our{" "}

              <Link
                to="/privacy-policy"
                className="
                  text-neutral-700
                  underline
                  underline-offset-2
                  hover:text-neutral-900
                "
              >
                Privacy Policy
              </Link>

              {" "}and{" "}

              <Link
                to="/cookie-policy"
                className="
                  text-neutral-700
                  underline
                  underline-offset-2
                  hover:text-neutral-900
                "
              >
                Cookie Policy
              </Link>.
            </p>

            {/* Modal actions */}
            <div
              className="
                flex
                flex-col-reverse
                gap-2
                border-t
                border-neutral-100
                px-5
                py-4

                sm:flex-row
                sm:px-6
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowPreferences(false)
                }
                className="
                  flex-1
                  rounded-xl
                  border
                  border-neutral-200
                  py-3
                  text-[13px]
                  font-semibold
                  text-neutral-600
                  transition-colors
                  hover:bg-neutral-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  savePreferences(preferences)
                }
                className="
                  flex-1
                  rounded-xl
                  bg-[#1c4f91]
                  py-3
                  text-[13px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#163f75]
                "
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}