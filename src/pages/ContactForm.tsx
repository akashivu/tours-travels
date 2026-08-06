import { useState } from "react";
import { Mail, Phone, MapPin, User, Send, CheckCircle } from "lucide-react";
import axiosClient from "../api/axiosClient";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await axiosClient.post("/send-email", formData);

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        location: "",
        phone: "",
        email: "",
        message: "",
      });
    }, 3000);
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/627527.png')",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-medium">Contact</p>
              <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
                Let's plan your<br />perfect journey
              </h2>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                Our team is available every day to help you with bookings, queries, and custom trips.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-gray-900">+91 7022237255</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-gray-900 break-all">support@elixway.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-gray-900">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Send a message</h3>
                  <p className="text-xs text-gray-400 mt-1">We'll get back to you within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Your name" icon={User} type="text" name="name" value={formData.name} onChange={handleChange} />
                  <InputField label="Location" icon={MapPin} type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Phone number" icon={Phone} type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  <InputField label="Email address" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                  <label className={labelCls}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full text-sm text-gray-900 bg-transparent outline-none resize-none border-b border-gray-200 py-2 focus:border-gray-900 transition-colors placeholder-transparent"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 active:bg-black transition-colors px-6 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-2 py-8">
                <CheckCircle className="w-8 h-8 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900 mt-2">Message sent</h3>
                <p className="text-sm text-gray-500">Thank you for reaching out. We'll be in touch soon.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const labelCls = "block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2";

function InputField({
  label,
  icon: Icon,
  type,
  name,
  value,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex items-center gap-2 border-b border-gray-200 py-1.5 focus-within:border-gray-900 transition-colors">
        <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="flex-1 text-sm text-gray-900 bg-transparent outline-none placeholder-transparent"
        />
      </div>
    </div>
  );
}