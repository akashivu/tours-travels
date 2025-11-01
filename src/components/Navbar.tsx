import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import AccountModal from "./AccountModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/holiday-packages", label: "Holiday Packages" },
    { path: "/vehicle", label: "Our Cars" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`backdrop-blur-lg bg-white/95 shadow-sm transition-all duration-300 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="https://marketplace.canva.com/EAFvvrEdW20/2/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-8fYWV8dFqJw.jpg"
                alt="Adiyogicabz Logo"
                className={`transition-all duration-300 ${
                  isScrolled ? "h-11" : "h-14"
                } w-auto rounded-lg shadow-sm group-hover:shadow-md`}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-800 tracking-tight">
                Adiyogicabz
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Premium Airport Transfers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <AccountModal />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 border-t border-slate-200 mt-2">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      isActive(link.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-200">
                <AccountModal />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
