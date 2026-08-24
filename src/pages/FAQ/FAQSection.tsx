import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Elixway?",
    answer:
      "Elixway is an intelligent travel platform designed to make discovering, planning, and experiencing travel simpler. It brings travel experiences, useful information, and intelligent assistance together in one seamless platform.",
  },
  {
    question: "How does Elixway help me plan a trip?",
    answer:
      "Elixway helps you discover destinations, understand places, explore experiences, and make better travel decisions. Our intelligent systems are designed to provide useful information throughout your journey.",
  },
  {
    question: "Can Elixway recommend destinations?",
    answer:
      "Yes. Elixway can help you discover destinations based on what you are interested in, the type of experience you are looking for, and the kind of journey you want to create.",
  },
  {
    question: "Does Elixway use AI?",
    answer:
      "Yes. Elixway uses intelligent AI technology to understand your questions, provide contextual travel information, and help you make decisions more easily.",
  },
  {
    question: "Can I use Elixway on my phone?",
    answer:
      "Yes. Elixway is designed to provide a seamless experience across desktop, tablet, and mobile devices, so you can access your travel information wherever you are.",
  },
  {
    question: "Is Elixway a travel booking platform?",
    answer:
      "Elixway is being designed as a broader travel technology platform. Beyond booking, our goal is to help people discover, understand, plan, and experience destinations more intelligently.",
  },
  {
    question: "Is Elixway free to use?",
    answer:
      "Many Elixway experiences can be accessed without a subscription. Some future services or advanced features may have different pricing depending on the experience.",
  },
  {
    question: "How can I get started?",
    answer:
      "Simply explore Elixway and start discovering destinations or asking questions about your next journey. The platform is designed to make the first step as simple as possible.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="w-full scroll-mt-24 bg-white text-neutral-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:px-12 lg:py-16">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:gap-16">
          {/* Left */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              FAQ
            </p>

            <h2 className="mt-3 max-w-sm text-2xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-3xl">
              Questions,
              <br />
              answered.
            </h2>

            <p className="mt-3 max-w-xs text-[13px] leading-6 text-neutral-500">
              Everything you need to know about Elixway and how the platform
              works.
            </p>
          </div>

          {/* Right */}
          <div className="border-t border-neutral-200">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className="border-b border-neutral-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-4 text-left sm:py-4.5"
                  >
                    <span
                      className={`text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 sm:text-[15px] ${
                        isOpen
                          ? "text-neutral-950"
                          : "text-neutral-700 group-hover:text-neutral-950"
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-200 text-neutral-500 group-hover:border-neutral-400"
                      }`}
                    >
                      <Plus
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                      />
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-2xl pb-4 pr-10 text-[13px] leading-6 text-neutral-500">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}