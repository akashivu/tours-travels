import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { openCookiePreferences } from "../utils/cookie";

export default function Footer() {
  return (
    <footer
      className="bg-zinc-900 text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-800">

          {/* Brand + Contact */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div>
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  lineHeight: 1.2,
                }}
              >
                Adiyogi
              </h2>
              <p
                className="text-zinc-500 mt-0.5"
                style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
              >
                Tours & Travels
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: MdEmail, text: "vijaytourstravels6158@gmail.com" },
                { icon: MdPhone, text: "+91 7022237255" },
                { icon: MdLocationOn, text: "Bellandur, Bangalore, Karnataka" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon className="text-zinc-500 flex-shrink-0 mt-0.5" size={14} />
                  <span className="text-zinc-400 text-xs leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-6">
            <p
              className="text-zinc-500 mb-4"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/vehicle", label: "Our Fleet" },
                { to: "/holiday-packages", label: "Our Services" },
                { to: "/contact", label: "Contact Us" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-zinc-400 hover:text-white transition-colors text-xs"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 md:col-start-9">
            <p
              className="text-zinc-500 mb-4"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-zinc-400 hover:text-white transition-colors text-xs"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-zinc-400 hover:text-white transition-colors text-xs"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-zinc-400 hover:text-white transition-colors text-xs"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <button
                  onClick={openCookiePreferences}
                  className="text-zinc-400 hover:text-white transition-colors text-xs text-left"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-zinc-400 hover:text-white transition-colors text-xs"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Informed */}
          <div className="md:col-span-2 md:col-start-11">
            <p
              className="text-zinc-500 mb-4"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Stay Informed
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Get updates on our latest packages and offers.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-zinc-600 text-xs">
            © 2025 Vijay Tours & Travels. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">
            Designed by{" "}
            <a
              href="mailto:akashivu002@gmail.com"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Akash Patil
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}