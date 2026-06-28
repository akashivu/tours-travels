import { useEffect } from "react";
import { MessageSquare, Sparkles, MapPin, Calendar, CreditCard, ArrowRight } from "lucide-react";
import { AIWidget } from "../components/ai/AIWidget";
import { aiService } from "../services/aiService";

const DESTINATIONS = [
  {
    name: "Manali",
    tag: "Mountains",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80&auto=format&fit=crop",
    pos: "top-4 left-8",
    delay: "0s",
  },
  {
    name: "Jaipur",
    tag: "Heritage",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80&auto=format&fit=crop",
    pos: "top-32 right-4",
    delay: "0.4s",
  },
  {
    name: "Goa",
    tag: "Beaches",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80&auto=format&fit=crop",
    pos: "bottom-24 left-16",
    delay: "0.8s",
  },
  {
    name: "Rishikesh",
    tag: "Adventure",
    img: "https://images.unsplash.com/photo-1592635196078-9fcb24cc7eb1?w=400&q=80&auto=format&fit=crop",
    pos: "bottom-4 right-20",
    delay: "1.2s",
  },
];

const STEPS = [
  { icon: MessageSquare, title: "Chat", desc: "Tell our AI where, when and how you want to go." },
  { icon: Calendar,      title: "Book",  desc: "Get instant fares, vehicle options and confirm in seconds." },
  { icon: CreditCard,    title: "Ride",  desc: "Pay securely. Driver details delivered to your inbox." },
];

export default function AIAssistant() {
  // Ensure widget is open when this page loads (UX only — no logic added)
  useEffect(() => {
    if (!aiService.getWidgetOpen()) aiService.setWidgetOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/40 overflow-hidden">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ───── LEFT — Pitch + floating destinations ───── */}
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              <Sparkles size={13} /> Powered by Adiyogi AI
            </span>

            <h1 className="mt-5 text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Plan, book and ride —
              <span className="block bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                all in one conversation.
              </span>
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-lg leading-relaxed">
              Skip the forms. Just chat. Our AI assistant handles cab bookings,
              airport transfers, outstation trips, hotel suggestions and trip planning —
              in seconds.
            </p>

            {/* 3-step how it works */}
            <div className="mt-8 space-y-3 max-w-md">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-4 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
                      <Icon size={18} strokeWidth={2.25} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-orange-600">0{i + 1}</span>
                        <h3 className="font-semibold text-slate-900">{s.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating destination cards */}
            <div className="relative mt-12 h-[320px] hidden md:block">
              <p className="absolute -top-2 left-0 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Popular with our travellers
              </p>
              {DESTINATIONS.map((d) => (
                <div
                  key={d.name}
                  className={`absolute ${d.pos} w-40 rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 hover:scale-105 transition-transform duration-300`}
                  style={{ animation: `floaty 6s ease-in-out ${d.delay} infinite` }}
                >
                  <img src={d.img} alt={d.name} className="h-24 w-full object-cover" />
                  <div className="p-2.5">
                    <div className="flex items-center gap-1 text-orange-600">
                      <MapPin size={11} />
                      <span className="text-[10px] font-semibold uppercase tracking-wide">{d.tag}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">{d.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ───── RIGHT — Chat anchor frame ───── */}
          <div className="relative lg:sticky lg:top-10">
            <div className="relative rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-sm p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-orange-600">Live Assistant</div>
                  <h2 className="text-lg font-bold text-slate-900">Your AI travel concierge</h2>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Visual placeholder where chat overlays on smaller screens */}
              <div className="rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50/60 to-white p-8 text-center min-h-[420px] flex flex-col items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                  <MessageSquare size={22} />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  The chat is open on the bottom right.
                </p>
                <p className="mt-1 text-xs text-slate-500 max-w-xs">
                  Ask anything — "Cab from Delhi to Manali tomorrow", "Cheapest airport pickup", or pick a suggestion.
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600">
                  Start chatting <ArrowRight size={13} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["10k+ trips", "4.9★ rated", "24/7 support"].map((t) => (
                  <div key={t} className="rounded-xl bg-slate-50 py-2 text-[11px] font-semibold text-slate-600">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>

      <AIWidget />
    </div>
  );
}
