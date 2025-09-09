import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm flex justify-between items-center px-6 py-3 shadow-md">
  {/* Left side - Contact */}
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2 hover:text-yellow-400 transition duration-300 cursor-pointer">
      <PhoneIcon className="h-5 w-5 text-yellow-400" />
      <span className="tracking-wide">+91 7022237255</span>
    </div>
    <div className="flex items-center gap-2 hover:text-yellow-400 transition duration-300 cursor-pointer">
      <EnvelopeIcon className="h-5 w-5 text-yellow-400" />
      <span className="tracking-wide">vijaytourstravels6158@gmail.com</span>
    </div>
  </div>

  {/* Right side - Social Icons */}
  <div className="flex items-center gap-5">
    <FaFacebook className="h-5 w-5 cursor-pointer hover:text-yellow-400 transition duration-300" />
    <FaInstagram className="h-5 w-5 cursor-pointer hover:text-yellow-400 transition duration-300" />
  </div>
</div>


      {/* Main navbar */}
   <nav className="bg-white shadow-lg">
  <div className="container mx-auto flex justify-between items-center py-4 px-6">
    {/* Logo */}
    <div className="flex items-center gap-2">
      <img 
        src="https://marketplace.canva.com/EAFvvrEdW20/2/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-8fYWV8dFqJw.jpg" 
        alt="Logo" 
        className="h-12 w-auto drop-shadow-md" 
      />
    </div>

    {/* Nav Links */}
    <ul className="hidden md:flex gap-6 text-md font-semibold text-gray-700 tracking-wide">
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Home</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Outstation</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Local Package</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Holiday Packages</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Popular Destinations</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Fleet / Our Cars</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">About Us</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Contact Us</li>
    </ul>

    {/* CTA Button */}
    <button className="hidden md:block bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300">
      Book Now
    </button>
  </div>
</nav>
    </header>
  );
}
