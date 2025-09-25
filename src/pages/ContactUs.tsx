import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Help & Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
       
        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <p className="text-gray-600 mb-6">
           Bellandur post <br />
            Banglore, 560103
          </p>

          <h2 className="text-xl font-semibold mb-4">Phone</h2>
          <p className="text-gray-600 mb-6">+7022237255</p>

          <h2 className="text-xl font-semibold mb-4">Email</h2>
          <p className="text-gray-600 mb-6">vijaytourstravels6158@gmail.com</p>

          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-gray-600 text-xl">
            <a href="#" className="hover:text-indigo-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-indigo-600"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-600"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-600"><FaGoogle /></a>
          </div>

          <p className="mt-8 text-sm text-gray-500">©2025 VijayTravels. Privacy Policy</p>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border rounded-md p-3 focus:ring focus:ring-indigo-200"
            />
            <input
              type="email"
              placeholder="Enter a valid email address"
              className="w-full border rounded-md p-3 focus:ring focus:ring-indigo-200"
            />
            <textarea
              rows={4}
              placeholder="Enter your message"
              className="w-full border rounded-md p-3 focus:ring focus:ring-indigo-200"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
