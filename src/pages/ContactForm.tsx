import { useState } from "react";
import { Mail, Phone, MapPin, User, Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
  
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          location: "",
          phone: "",
          email: "",
          message: ""
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div
      className="relative bg-cover bg-center flex flex-col justify-center items-center px-4 py-20 md:py-24"
      style={{
        backgroundImage:
          "url('https://wallpaperaccess.com/full/627527.png')",
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-blue-900/90"></div>

      <div className="relative z-10 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          
          <div className="text-white space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium mb-4">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Let's talk about <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  working together
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
                Got queries? Our dedicated support team is ready to help you with quick solutions, every day of the week.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Call Us</h4>
                  <p className="text-slate-300">+91 7022237255</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email Us</h4>
                  <p className="text-slate-300 text-sm break-all">vijaytourstravels6158@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Visit Us</h4>
                  <p className="text-slate-300">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>

        
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                      Send us a message
                    </h3>
                    <p className="text-slate-600">
                      Fill out the form and we'll get back to you shortly
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800"
                          />
                        </div>
                      </div>

                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Your City"
                            required
                            className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Contact Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                            className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800"
                          />
                        </div>
                      </div>

                    
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-none transition-all duration-200 text-slate-800"
                      ></textarea>
                    </div>

                  
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="mb-6">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-600">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}
            </div>

          
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 