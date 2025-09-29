import { useState, useEffect } from "react";
import {  FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import AccountModal from "./AccountModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0  left-0 w-full z-50">
      
      

      
      <nav
        className={`backdrop-blur-md bg-white/70 shadow-md transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          
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
            <li><Link to="/" className="hover:text-blue-600">AIRPORT TAXI</Link></li>
            <li><Link to="/" className="hover:text-blue-600">OUTSTATION TAXI</Link></li>
            <li><Link to="/local-package" className="hover:text-blue-600">LOCAL PACKAGE</Link></li>
            <li><Link to="/holiday-packages" className="hover:text-blue-600">HOLIDAY PACKAGES</Link></li>
            <li><Link to="/vehicles" className="hover:text-blue-600">OUR CARS</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">ABOUT US</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">CONTACT US</Link></li>
          </ul>
        <div className="hidden md:block">
  <AccountModal />
</div>
          
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

       
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg px-6 py-4">
            <ul className="flex flex-col gap-4 text-gray-800 font-medium">
              <li><Link to="/" onClick={() => setIsOpen(false)}>HOME</Link></li>
              <li><Link to="/airport" onClick={() => setIsOpen(false)}>AIRPORT TAXI</Link></li>
              <li><Link to="/outstation" onClick={() => setIsOpen(false)}>OUTSTATION TAXI</Link></li>
              <li><Link to="/local-package" onClick={() => setIsOpen(false)}>LOCAL PACKAGE</Link></li>
              <li><Link to="/holiday-packages" onClick={() => setIsOpen(false)}>HOLIDAY PACKAGES</Link></li>
              <li><Link to="/cars" onClick={() => setIsOpen(false)}>OUR CARS</Link></li>
              <li><Link to="/about" onClick={() => setIsOpen(false)}>ABOUT US</Link></li>
              <li><Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT US</Link></li>
              <li><AccountModal /></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
