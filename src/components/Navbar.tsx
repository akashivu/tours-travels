import { useState, useEffect } from "react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm flex justify-between items-center px-6 py-2 shadow-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
            <PhoneIcon className="h-5 w-5 text-yellow-400" />
            <span>+91 7022237255</span>
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
            <EnvelopeIcon className="h-5 w-5 text-yellow-400" />
            <span>vijaytourstravels6158@gmail.com</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <FaFacebook className="h-5 w-5 cursor-pointer hover:text-yellow-400" />
          <FaInstagram className="h-5 w-5 cursor-pointer hover:text-yellow-400" />
        </div>
      </div>

     
      <nav
        className={`backdrop-blur-md bg-white/70 shadow-md transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          
          <div className="flex items-center gap-2 transition-all duration-300">
            <img
              src="https://marketplace.canva.com/EAFvvrEdW20/2/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-8fYWV8dFqJw.jpg"
              alt="Logo"
              className={`transition-all duration-300 ${
                isScrolled ? "h-10" : "h-14"
              } w-auto drop-shadow-md`}
            />
          </div>

          
          <ul className="hidden md:flex gap-8 text-md font-semibold text-gray-800 tracking-wide">
            <li><Link to="/" className="hover:text-blue-600">HOME</Link></li>
            <li><Link to="/airport" className="hover:text-blue-600">AIRPORT TAXI</Link></li>
            <li><Link to="/outstation" className="hover:text-blue-600">OUTSTATION TAXI</Link></li>
            <li><Link to="/local-package" className="hover:text-blue-600">LOCAL PACKAGE</Link></li>
            <li><Link to="/holiday-packages" className="hover:text-blue-600">HOLIDAY PACKAGES</Link></li>
            <li><Link to="/cars" className="hover:text-blue-600">OUR CARS</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">ABOUT US</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">CONTACT US</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
