import { FaFacebook, FaInstagram } from "react-icons/fa";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
     
        <div>
          <img
            src="https://marketplace.canva.com/EAFvvrEdW20/2/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-8fYWV8dFqJw.jpg"
            alt="Logo"
            className="h-14 mb-4"
          />
          <p className="text-sm leading-relaxed">
            We are Vijay Tours & Travels, providing customers with reliable and
            premium intercity and local car rental services. Over the last
            decade, we have become one of the most trusted chauffeur-driven car
            rental companies in India with strong geographical reach.
          </p>
        </div>

        
        <div>
          <h3 className="text-white font-bold text-lg mb-4 tracking-wide">Our Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">Blog</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        
        <div>
        <h3 className="text-white font-bold text-lg mb-4 tracking-wide">
  More Services
</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-yellow-400 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-yellow-400 cursor-pointer">Cancellation Policy</li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-bold text-lg mb-4 tracking-wide">Contact Us</h3>
          <div className="flex items-center gap-2 mb-3">
            <PhoneIcon className="h-5 w-5 text-yellow-400" />
            <span>+91 7022237255</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <EnvelopeIcon className="h-5 w-5 text-yellow-400" />
            <span>vijaytourstravels6158@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-yellow-400" />
            <span>
              BTM 4th Stage, Bengaluru, Karnataka <br /> 560076
            </span>
          </div>
        </div>
      </div>

      
       <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col md:flex-row items-center justify-between px-6">
        
        <p className="md:w-1/3 text-center md:text-left">
          © 2025 Vijay Tours & Travels. All rights reserved.
        </p>

        
        <p className="md:w-1/3 text-center my-2 md:my-0">
          Developed by{" "}
          <span className="font-semibold text-yellow-400">Akash Patil</span> –{" "}
          <a
            href="mailto:akashivu002@gmail.com"
            className="hover:underline text-gray-300"
          >
            akashivu002@gmail.com
          </a>
        </p>

       
        <div className="md:w-1/3 flex justify-center md:justify-end gap-4">
          <FaFacebook className="h-5 w-5 cursor-pointer hover:text-yellow-400" />
          <FaInstagram className="h-5 w-5 cursor-pointer hover:text-yellow-400" />
        </div>
      </div>
    </footer>
  );
}
