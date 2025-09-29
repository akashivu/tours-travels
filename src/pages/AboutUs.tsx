export default function AboutUsSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-6">
            {/* About Us Badge */}
            <div className="inline-flex items-center bg-black border-2 border-white rounded-full px-6 py-2">
              <div className="flex items-center gap-2 mr-3">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
              <span className="font-semibold text-lg">About Us</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Luxury Car Rental with Excellence in Service & Quality
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              We specialize in premium car rentals across India, offering both residents and visitors an unparalleled driving experience. Our fleet features the latest models, meticulously selected to provide ultimate comfort and style. Whether you're a resident or a visitor seeking a seamless and luxurious transport solution, we ensure a smooth rental process from booking to delivery, so you can enjoy your journey with ease.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 shadow-lg">
                BOOK YOUR CAR
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-2">
                LEARN MORE
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional businessman"
                className="w-full h-[500px] object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Stats Card - Happy Clients */}
            <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  798+
                </div>
                <div className="text-gray-600 font-semibold">
                  Happy Clients
                </div>
              </div>
            </div>

            {/* Decorative Circle - Key Image */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full shadow-xl flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>

            {/* Additional Stats - Optional */}
            <div className="absolute top-8 -left-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 shadow-xl">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs font-semibold">Support</div>
              </div>
            </div>
          </div>
        </div>
        {/* 🚀 Removed the bottom stats row */}
      </div>
    </section>
  );
}
