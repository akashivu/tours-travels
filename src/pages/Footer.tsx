import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">
          
         
          <div className="lg:col-span-5">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                
                <div>
                  <h2 className="text-3xl font-bold tracking-wider">ADIYOGI</h2>
                  <p className="text-sm tracking-widest">TOURS & TRAVELS</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MdEmail className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-300">vijaytourstravels6158@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MdPhone className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-300">+91 7022237255</span>
              </div>
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-300">Bellandur, Bangalore, Karnataka</span>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-3">Quick Links</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <span className="text-gray-500">»</span>
                <span className="text-sm">Home</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <span className="text-gray-500">»</span>
                <span className="text-sm">About Us</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <span className="text-gray-500">»</span>
                <span className="text-sm">Our Fleet</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <span className="text-gray-500">»</span>
                <span className="text-sm">Our Services</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <span className="text-gray-500">»</span>
                <span className="text-sm">Contact Us</span>
              </li>
            </ul>
          </div>

         
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold mb-6">Subscribe to stay informed</h3>
            <div className="flex mb-6">
              <input 
                type="email" 
                placeholder="enter your email"
                className="flex-1 bg-transparent border border-gray-600 rounded-l-full px-6 py-3 text-sm focus:outline-none focus:border-gray-400 text-gray-300 placeholder-gray-500"
              />
              <button className="bg-white text-black px-8 py-3 rounded-r-full font-medium text-sm hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <FaFacebookF size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            ©2024 Vijay Tours & Travels – All Rights Reserved
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Designed & Developed by <span className="text-gray-300">Akash Patil</span> – 
            <a href="mailto:akashivu002@gmail.com" className="hover:underline ml-1 text-gray-400">
              akashivu002@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}