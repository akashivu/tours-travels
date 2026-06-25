export default function AboutUsSection() {
  return (
    <section
      className="py-16 px-8 bg-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left — heading */}
          <div className="lg:col-span-4">
            <p
              className="text-zinc-400 mb-3"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
            >
              About Us
            </p>
            <h2
              className="text-zinc-900 leading-snug"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
              }}
            >
              Reliable Cab Services for Every Journey
            </h2>
          </div>

          {/* Right — content */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Adiyogi Cabz provides trusted airport transfers, local rentals, and
              outstation cab services designed for comfort, safety, and convenience.
              With professional drivers and well-maintained vehicles, we ensure a
              smooth travel experience from pickup to destination.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Professional Drivers",
                "Airport Transfers",
                "Local & Rental Cabs",
                "Outstation Trips",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <p
              className="text-zinc-400 text-sm italic leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              "Travel is not just about reaching a destination — it's about
              enjoying every mile along the way."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}