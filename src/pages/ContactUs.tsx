import { useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const contactDetails = [
  {
    label: "Email",
    value: "hello@elixway.com",
    href: "mailto:hello@elixway.com",
    icon: Mail,
  },
  {
    label: "Location",
    value: "Bengaluru, India",
    href: "#",
    icon: MapPin,
  },
];

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactUs() {
  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (
    event:
      React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear previous messages when user edits the form.
    if (error) {
      setError("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    /*
     * Client-side validation
     */
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      let data: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to send your message. Please try again."
        );
      }

      /*
       * Successful submission
       */
      setSubmitted(true);

      setFormData(initialFormData);
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-white text-neutral-950">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:px-8 sm:pb-28 sm:pt-32 lg:px-12 lg:pb-32 lg:pt-36">
          <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            {/* Heading */}
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-8 bg-neutral-950" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  Contact Elixway
                </span>
              </div>

              <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                Let&apos;s start
                <br />
                a conversation.
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-md lg:ml-auto">
              <p className="text-lg leading-8 text-neutral-600 sm:text-xl">
                Have a question, idea, partnership opportunity,
                or simply want to know more about Elixway?
                We&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl border-t border-neutral-200 px-6 sm:px-8 lg:px-12" />
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            {/* =================================================
                CONTACT INFORMATION
            ================================================== */}
            <aside>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Get in touch
              </p>

              <h2 className="mt-6 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                We&apos;re always open to a good conversation.
              </h2>

              <div className="mt-12 space-y-8">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <a
                      key={detail.label}
                      href={detail.href}
                      className="group flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors duration-200 group-hover:border-neutral-950">
                        <Icon
                          className="h-4 w-4 text-neutral-500 transition-colors duration-200 group-hover:text-neutral-950"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                          {detail.label}
                        </p>

                        <p className="mt-1 text-sm font-medium text-neutral-800 transition-colors group-hover:text-neutral-950">
                          {detail.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* =================================================
                CONTACT FORM
            ================================================== */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="border-t border-neutral-200"
              >
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* =================================================
                    NAME
                ================================================== */}
                <div className="border-b border-neutral-200 py-7">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-950 outline-none placeholder:text-neutral-300 focus:ring-0"
                  />
                </div>

                {/* =================================================
                    EMAIL
                ================================================== */}
                <div className="border-b border-neutral-200 py-7">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={150}
                    required
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-950 outline-none placeholder:text-neutral-300 focus:ring-0"
                  />
                </div>

                {/* =================================================
                    SUBJECT
                ================================================== */}
                <div className="border-b border-neutral-200 py-7">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    maxLength={200}
                    required
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-950 outline-none placeholder:text-neutral-300 focus:ring-0"
                  />
                </div>

                {/* =================================================
                    MESSAGE
                ================================================== */}
                <div className="border-b border-neutral-200 py-7">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about what you have in mind..."
                    rows={6}
                    maxLength={5000}
                    required
                    className="w-full resize-none border-0 bg-transparent p-0 text-lg leading-7 text-neutral-950 outline-none placeholder:text-neutral-300 focus:ring-0"
                  />

                  <div className="mt-3 text-right text-xs text-neutral-300">
                    {formData.message.length}/5000
                  </div>
                </div>

                {/* =================================================
                    FORM ACTION
                ================================================== */}
                <div className="flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
                  <p className="max-w-sm text-xs leading-5 text-neutral-400">
                    We&apos;ll review your message and get back to
                    you as soon as possible.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-4 rounded-full bg-neutral-950 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : "Send message"}

                    {!isSubmitting && (
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        strokeWidth={1.8}
                      />
                    )}
                  </button>
                </div>

                {/* =================================================
                    SUCCESS MESSAGE
                ================================================== */}
                {submitted && (
                  <div className="mt-8 border border-neutral-200 bg-neutral-50 px-5 py-4">
                    <p className="text-sm font-medium text-neutral-950">
                      Message sent successfully.
                    </p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Thanks for reaching out. We&apos;ll get
                      back to you soon.
                    </p>
                  </div>
                )}

                {/* =================================================
                    ERROR MESSAGE
                ================================================== */}
                {error && (
                  <div className="mt-8 border border-red-200 bg-red-50 px-5 py-4">
                    <p className="text-sm font-medium text-red-700">
                      {error}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM STATEMENT
      ====================================================== */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              Elixway
            </p>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Better journeys begin with better conversations.
              </h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}