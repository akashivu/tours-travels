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
        className={`bg-white border-b border-slate-100 transition-all duration-300 ${
          isScrolled ? "py-3 shadow-sm" : "py-4"
        }`}
      >
       <div className="max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center px-6 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://marketplace.canva.com/EAFvvrEdW20/2/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-8fYWV8dFqJw.jpg"
              alt="Elixway Logo"
              className="h-8 w-8 rounded-lg"
            />

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-base text-slate-900">
                Elixway
              </span>

              
            </div>
          </Link>

          {/* Desktop Navigation */}
         <ul className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
  isActive(link.path)
    ? "text-slate-900"
    : "text-slate-500 hover:text-slate-900"
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
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-slate-100 px-4 py-4">
             <AccountModal />
          <div className="hidden lg:flex justify-center">
  <ul className="flex items-center gap-8">
    {navLinks.map((link) => (
      <li key={link.path}>
        <Link
          to={link.path}
          className={`text-sm font-medium transition-colors ${
            isActive(link.path)
              ? "text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
</div>
          </div>
        </div>
      </nav>
    </header>
  );
}