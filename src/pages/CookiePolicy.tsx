export default function CookiePolicy() {
  const lastUpdated = "27 June 2026";

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">

        {/* ── Header ── */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Cookie Policy
        </h1>

        <p className="mt-4 text-lg font-semibold text-gray-900">
          ElixWay
        </p>

        <p className="mt-1 text-sm text-gray-400">
          Last Updated: {lastUpdated}
        </p>

        <p className="mt-8 text-base leading-7 text-gray-700">
          This Cookie Policy explains what cookies are, which cookies
          ElixWay uses on{" "}
          <a
            href="https://elixway.com"
            className="text-orange-500 underline-offset-4 hover:underline"
          >
            elixway.com
          </a>
          , and how you can control them. By continuing to use our website, you
          agree to our use of essential cookies as described below.
        </p>

        <hr className="my-10 border-gray-100" />

        {/* ── Section 1 ── */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            1. What Are Cookies?
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Cookies are small text files placed on your device by a website when
            you visit it. They allow the website to remember your actions and
            preferences over time, so you don't have to re-enter them each time
            you return. Cookies are widely used to make websites work properly
            and to provide website owners with usage information.
          </p>
        </section>

        <hr className="my-10 border-gray-100" />

        {/* ── Section 2 ── */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            2. Cookies We Use
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            We use two categories of cookies on our website:
          </p>

          {/* Essential */}
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-full bg-gray-900 px-3 py-0.5 text-xs font-semibold text-white">
                Essential
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                Always active
              </span>
            </div>
            <p className="mt-3 text-base leading-7 text-gray-700">
              These cookies are strictly necessary for our website and booking
              system to function. They handle session management, security, and
              your cookie preference settings. You cannot opt out of these
              cookies as they are required for the Service to operate.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                Stores your cookie consent preferences
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                Maintains your session while using the booking flow
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                Protects against cross-site request forgery (CSRF)
              </li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-full border border-orange-400 px-3 py-0.5 text-xs font-semibold text-orange-500">
                Analytics
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                Requires consent
              </span>
            </div>
            <p className="mt-3 text-base leading-7 text-gray-700">
              With your permission, we use Microsoft Clarity to collect
              anonymous usage data about how visitors interact with our website.
              This helps us identify usability issues and improve the booking
              experience. No personally identifiable information is collected by
              Clarity.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                Page views and navigation paths
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                Click patterns and scroll depth
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                Device type and browser information
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                General geographic region (not precise location)
              </li>
            </ul>
          </div>
        </section>

        <hr className="my-10 border-gray-100" />

        {/* ── Section 3 ── */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            3. Microsoft Clarity
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Microsoft Clarity is a behaviour analytics tool provided by
            Microsoft. When you consent to analytics cookies, Clarity may record
            session replays and heatmaps to help us understand how our pages are
            used. This data is anonymised and does not include your name, phone
            number, or booking details.
          </p>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Microsoft's own privacy policy governs how Clarity handles the data
            it collects. You can read it at{" "}
            <a
              href="https://privacy.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline-offset-4 hover:underline"
            >
              privacy.microsoft.com
            </a>
            .
          </p>
        </section>

        <hr className="my-10 border-gray-100" />

        {/* ── Section 4 ── */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            4. Managing Your Cookie Preferences
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            You are in control of your cookie choices. You can update your
            preferences at any time using the{" "}
            <strong className="font-semibold text-gray-900">
              Cookie Preferences
            </strong>{" "}
            option in the footer of our website. Withdrawing consent for
            analytics cookies will stop Microsoft Clarity from collecting data
            on your future visits.
          </p>

          <p className="mt-4 text-base leading-7 text-gray-700">
            You can also control cookies directly in your browser settings. Most
            browsers allow you to block or delete cookies. Note that blocking
            essential cookies may affect the functionality of our website and
            booking system.
          </p>
        </section>

        <hr className="my-10 border-gray-100" />

        {/* ── Section 5 ── */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            5. Changes to This Policy
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            We may update this Cookie Policy from time to time to reflect
            changes in the cookies we use or for other legal or operational
            reasons. When we do, we will revise the "Last Updated" date at the
            top of this page.
          </p>
        </section>

        <hr className="my-10 border-gray-100" />

        {/* ── Section 6 ── */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            6. Contact Us
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            If you have any questions about how we use cookies, please reach us
            through our{" "}
            <a
              href="/contact"
              className="text-orange-500 underline-offset-4 hover:underline"
            >
              Contact page
            </a>
            .
          </p>

          <div className="mt-4 text-base leading-7 text-gray-700">
            <p className="font-semibold text-gray-900">ElixWay</p>
            <p>Bangalore, Karnataka, India</p>
            <p>
              <a
                href="https://elixway.com"
                className="text-orange-500 underline-offset-4 hover:underline"
              >
                elixway.com
              </a>
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <p className="mt-16 text-xs text-gray-400">
          © {new Date().getFullYear()} ElixWay. All rights reserved.
        </p>

      </div>
    </main>
  );
}