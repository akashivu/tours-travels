export default function ContactAdiyogicabz() {
  const phone = "+91 7022237255";
  const email = "vijaytoursandtravels6158@gmail.com";
  const address = "Kempegowda International Airport Bengaluru, Airport City South, Devanahalli, Bengaluru, Hunachur, Karnataka 560300";
  const whatsappNumber = "7022237255";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold tracking-widest text-blue-400 uppercase">Premium Airport Transfers</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience seamless travel with AdiyogiCabz. Our dedicated team ensures every journey is comfortable, punctual, and stress-free.
          </p>
        </div>

        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
           
            <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="mb-4">
                <h3 className="text-sm font-semibold tracking-wider text-blue-400 uppercase mb-2">Phone</h3>
                <a href={`tel:${phone}`} className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {phone}
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Call us directly for immediate assistance and instant booking confirmations.
              </p>
            </div>

            
            <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="mb-4">
                <h3 className="text-sm font-semibold tracking-wider text-green-400 uppercase mb-2">WhatsApp</h3>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors"
                >
                  Message Us
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Prefer texting? Connect via WhatsApp for quick responses and real-time updates.
              </p>
            </div>

            
            <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="mb-4">
                <h3 className="text-sm font-semibold tracking-wider text-purple-400 uppercase mb-2">Email</h3>
                <a href={`mailto:${email}`} className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors break-all">
                  {email}
                </a>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Send us detailed inquiries or special requests via email.
              </p>
            </div>

           
            <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-red-500 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="mb-4">
                <h3 className="text-sm font-semibold tracking-wider text-red-400 uppercase mb-2">Location</h3>
                <p className="text-xl font-bold text-white">
                  {address}
                </p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Serving all major airports with reliable, professional service.
              </p>
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-10 border border-blue-500/30 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Book Your Ride</h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Available 24/7 for all your airport transfer needs. Premium vehicles, professional drivers.
                </p>
              </div>
              
              <div className="space-y-4">
                <a
                  href={`tel:${phone}`}
                  className="block w-full px-8 py-4 rounded-xl bg-white text-blue-700 font-bold hover:bg-gray-100 transition-all duration-300 text-center"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-8 py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all duration-300 text-center"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block w-full px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all duration-300 text-center border border-slate-700"
                >
                  Email
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-500/30">
                <p className="text-sm text-blue-200 text-center">
                  Trusted by thousands of travelers
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center mb-16">
          <h3 className="text-sm font-semibold tracking-wider text-amber-400 uppercase mb-2">Operating Hours</h3>
          <p className="text-3xl font-bold text-white">24/7 Service Available</p>
          <p className="text-gray-400 mt-2">Round-the-clock support for your convenience</p>
        </div>

       
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Confirmation</h3>
            <p className="text-gray-400 leading-relaxed">
              Get immediate booking confirmations and real-time updates on your ride status.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-center hover:border-green-500/50 transition-all duration-300">
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-bold text-white mb-3">Transparent Pricing</h3>
            <p className="text-gray-400 leading-relaxed">
              No hidden fees or surprise charges. What you see is exactly what you pay.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-bold text-white mb-3">Premium Experience</h3>
            <p className="text-gray-400 leading-relaxed">
              Verified drivers, well-maintained vehicles, and exceptional service every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}