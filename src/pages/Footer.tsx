import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { openCookiePreferences } from "../utils/cookie";
import logo from "../assets/logo.png";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/vehicle", label: "Our Fleet" },
  { to: "/holiday-packages", label: "Our Services" },
  { to: "/contact", label: "Contact Us" },
];

const legalLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/cookie-policy", label: "Cookie Policy" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
];

const contactDetails = [
  {
    icon: MdEmail,
    text: "support@elixway.com",
    href: "mailto:support@elixway.com",
  },
  {
    icon: MdPhone,
    text: "+91 7022237255",
    href: "tel:+917022237255",
  },
  {
    icon: MdLocationOn,
    text: "Bellandur, Bengaluru, Karnataka",
  },
];


const LINKEDIN_URL = "#";

export default function Footer() {
  return (
    <footer
      className="bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 py-20">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="flex items-center gap-4">
  <img
    src={logo}
    alt="ElixWay Logo"
    className="w-14 h-14 object-contain rounded-xl"
  />

  <div>
    <h2
      className="text-white"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.45rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        lineHeight: 1.1,
      }}
    >
      ElixWay
    </h2>

    <p className="text-zinc-500 mt-1.5 text-[0.7rem] tracking-[0.15em] uppercase">
      AI-Powered Travel Platform
    </p>
  </div>
</div>

            <div className="flex flex-col gap-3">
              {contactDetails.map(({ icon: Icon, text, href }) => {
                const content = (
                  <span className="flex items-center gap-2.5 text-zinc-500 text-[0.8rem] leading-relaxed">
                    <Icon size={15} className="opacity-70" />
                    {text}
                  </span>
                );

                return href ? (
                  <a
                    key={text}
                    href={href}
                    className="w-fit transition-colors duration-200 hover:text-white [&_span]:hover:text-white"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={text}>{content}</div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-200 hover:border-zinc-600 hover:text-white"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-zinc-600 mb-5 text-[0.7rem] tracking-[0.15em] uppercase">
              Company
            </p>

            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-zinc-400 hover:text-white transition-colors duration-200 text-[0.8rem]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="text-zinc-600 mb-5 text-[0.7rem] tracking-[0.15em] uppercase">
              Legal
            </p>

            <ul className="flex flex-col gap-3">
              {legalLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-zinc-400 hover:text-white transition-colors duration-200 text-[0.8rem]"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={openCookiePreferences}
                  className="text-zinc-400 hover:text-white transition-colors duration-200 text-[0.8rem] text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-zinc-900 flex justify-center items-center">
          <p className="text-zinc-600 text-[0.75rem] tracking-wide">
            © 2026 ElixWay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}