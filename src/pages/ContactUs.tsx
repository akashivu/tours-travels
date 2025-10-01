import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      const res = await fetch("http://localhost:8080/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully! We’ll get back to you soon.", {
          style: {
            background: "#16a34a",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

     
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Have questions about our services? We're here to help. Reach out to our team and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          
          <div className="lg:col-span-1 space-y-6">
           
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Bellandur Post<br />
                    Bangalore, Karnataka<br />
                    560103, India
                  </p>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                  <FaPhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Number</h3>
                  <p className="text-gray-600">+91 7022237255</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h3>
                  <p className="text-gray-600 text-sm break-all">vijaytourstravels6158@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
              <div className="flex space-x-3">
                <button className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <FaFacebookF className="text-xl" />
                </button>
                <button className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <FaTwitter className="text-xl" />
                </button>
                <button className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <FaInstagram className="text-xl" />
                </button>
                <button className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <FaGoogle className="text-xl" />
                </button>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and our team will get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us about your travel plans or any questions you have..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  />
                </div>

               
                            <button
                        type="submit"
                       className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                           >
                           Send Message
                        </button>
                         

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>

       
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © 2025 Vijay Travels. All rights reserved. | 
            <span className="text-indigo-600 hover:text-indigo-700 ml-1 cursor-pointer">Privacy Policy</span> | 
            <span className="text-indigo-600 hover:text-indigo-700 ml-1 cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
}
