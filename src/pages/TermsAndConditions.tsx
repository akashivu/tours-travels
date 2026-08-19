export default function TermsAndConditions() {
  const sections = [
    {
      id: "service-overview",
      title: "1. Service Overview",
      content: `Elixway provides travel discovery, planning, cab booking, airport transfers, outstation trips, rental vehicles, and travel-related services through its digital platform. By accessing our website, using our services, or interacting with our AI assistant, you agree to be bound by these Terms & Conditions. These terms apply to all users, including passengers, visitors, customers, and third parties who interact with our platform.`,
    },
    {
      id: "booking-rules",
      title: "2. Booking Rules",
      content: `All bookings must be made through our website, AI assistant, or authorised contact channels. A booking is confirmed only after you receive a written or electronic confirmation from Elixway. We reserve the right to decline any booking at our discretion. You must provide accurate pickup location, drop location, date, time, and passenger count. Providing false or incomplete information may result in cancellation without refund. Bookings made less than 2 hours before the scheduled pickup are subject to driver availability and may not be guaranteed.`,
    },
    {
      id: "cancellation",
      title: "3. Cancellation & Refund Policy",
      content: `Cancellations made more than 24 hours before the scheduled pickup are eligible for a full refund. Cancellations made between 6 and 24 hours before pickup are eligible for a 50% refund. Cancellations made less than 6 hours before pickup are non-refundable. No-shows, where the passenger is absent at the pickup point, are non-refundable. Refunds, where applicable, will be processed within 5–7 business days to the original payment method. In cases of cancellation due to extreme weather, vehicle breakdown, or other force majeure events, Elixway may offer a reschedule or refund at its discretion.`,
    },
    {
      id: "passenger-responsibilities",
      title: "4. Passenger Responsibilities",
      content: `Passengers are responsible for being present at the agreed pickup point at the scheduled time. Elixway is not liable for missed pickups caused by passenger delay. Passengers must not engage in behaviour that endangers the driver or other passengers, including consuming alcohol or illegal substances in the vehicle. Any damage caused to the vehicle by a passenger may be charged to the passenger at the applicable cost of repair. Children must be accompanied by a responsible guardian. Passengers are responsible for their personal belongings throughout the journey.`,
    },
    {
      id: "pricing",
      title: "5. Pricing",
      content: `All fares displayed on the platform are estimates unless explicitly confirmed at booking. Final fares may vary based on actual distance, waiting time, toll charges, applicable taxes, parking charges, and other applicable travel costs. Outstation fares may be quoted per kilometre and may include driver allowances or other applicable charges. Airport transfer fares may include applicable parking charges. Elixway reserves the right to revise pricing at any time. Any pricing errors displayed on the platform may be corrected before booking confirmation, and users will be informed of the revised fare where applicable.`,
    },
    {
      id: "driver-responsibilities",
      title: "6. Driver Responsibilities",
      content: `Drivers associated with Elixway services are expected to operate vehicles safely and in accordance with applicable traffic laws and regulations. Drivers are expected to maintain appropriate vehicle standards and carry valid driving licences and required vehicle documentation. Drivers should not use mobile phones while driving and should treat passengers with courtesy and professionalism. Any driver misconduct, safety concern, or service-related issue should be reported to Elixway through our authorised support channels.`,
    },
    {
      id: "liability",
      title: "7. Liability",
      content: `Elixway is not liable for delays, interruptions, or losses caused by traffic conditions, road closures, weather conditions, natural events, government restrictions, technical failures, or circumstances beyond our reasonable control. To the extent permitted by applicable law, our total liability in relation to a specific booking shall not exceed the amount paid for that booking. Elixway is not responsible for consequential, indirect, or incidental losses, including missed flights, events, appointments, or other travel arrangements. Users are encouraged to make appropriate arrangements and consider suitable travel insurance for long-distance and outstation journeys.`,
    },
    {
      id: "ai-disclaimer",
      title: "8. AI Assistant Disclaimer",
      content: `Elixway's AI assistant is provided as a convenience tool to help users explore destinations, understand travel services, receive travel information, obtain fare estimates, and initiate bookings. AI-generated responses are informational and should not be considered final booking confirmations unless explicitly verified by Elixway. Fare estimates and other information provided by the AI may be approximate and subject to change. Elixway is not liable for decisions made solely on the basis of AI-generated responses. The AI may occasionally provide inaccurate, incomplete, or outdated information, and users should verify important booking and travel details with Elixway before making decisions.`,
    },
    {
      id: "intellectual-property",
      title: "9. Intellectual Property",
      content: `All content available through the Elixway platform, including text, graphics, logos, icons, images, designs, software, interfaces, and other materials, is owned by or licensed to Elixway and is protected under applicable intellectual property laws. You may not reproduce, distribute, modify, copy, republish, or create derivative works from any Elixway content without prior written permission. Unauthorised use of the Elixway brand name, logo, visual identity, or proprietary content is prohibited.`,
    },
    {
      id: "governing-law",
      title: "10. Governing Law",
      content: `These Terms & Conditions are governed by and construed in accordance with the applicable laws of India. Any disputes arising out of or in connection with these terms shall be subject to the applicable jurisdiction of courts in Bengaluru, Karnataka. We encourage users to contact Elixway support first so that concerns can be addressed and resolved amicably wherever possible.`,
    },
    {
      id: "contact",
      title: "11. Contact Information",
      content: `If you have any questions, concerns, complaints, or requests regarding these Terms & Conditions or Elixway services, please contact our support team.

Email: support@elixway.com

Elixway
Bengaluru, Karnataka, India

We aim to respond to support enquiries within 2 business days.`,
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
              Legal
            </p>

            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
              Terms &amp; Conditions
            </h1>

            <p className="mt-4 text-xs font-medium tracking-[-0.01em] text-neutral-400 sm:text-[13px]">
              Last updated: 2026 &nbsp;·&nbsp; Elixway
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-[15px]">
              Please read these terms carefully before using Elixway. By
              accessing our platform, booking a service, or using our travel
              tools, you agree to these terms.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          {/* Table of Contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Contents
            </p>

            <nav className="mt-5">
              <ol className="space-y-2.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="
                        block
                        text-[12px]
                        leading-5
                        text-neutral-500
                        transition-colors
                        duration-200
                        hover:text-neutral-950
                      "
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Sections */}
          <div className="min-w-0">
            <div className="border-t border-neutral-200">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="
                    scroll-mt-24
                    border-b
                    border-neutral-100
                    py-10
                    sm:py-12
                  "
                >
                  <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 sm:text-base">
                    {section.title}
                  </h2>

                  <div className="mt-5 max-w-2xl">
                    {section.content.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="
                          mb-4
                          text-[13.5px]
                          leading-[1.85]
                          tracking-[-0.005em]
                          text-neutral-500
                          last:mb-0
                          sm:text-[14px]
                        "
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Note */}
            <div className="pt-10 sm:pt-12">
              <p className="max-w-2xl text-[11.5px] leading-6 text-neutral-400">
                These terms were last reviewed and updated in 2026. Elixway
                reserves the right to update these Terms &amp; Conditions from
                time to time. Continued use of the platform following any
                changes constitutes acceptance of the revised terms.
              </p>

              <p className="mt-4 text-[11.5px] text-neutral-400">
                For questions or support, contact{" "}
                <a
                  href="mailto:support@elixway.com"
                  className="text-neutral-600 transition-colors hover:text-neutral-950"
                >
                  support@elixway.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}