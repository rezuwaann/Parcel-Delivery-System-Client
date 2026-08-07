import { Link } from "react-router";
import {
  Zap,
  CalendarClock,
  Truck,
  Warehouse,
  Building2,
  RotateCcw,
  KeyRound,
  MapPinned,
  ArrowRight,
  PhoneCall,
} from "lucide-react";

const SERVICES = [
  {
    icon: Zap,
    title: "Same-day delivery",
    desc: "Book before noon and it's on the recipient's doorstep before the day ends, anywhere we run same-day routes.",
  },
  {
    icon: CalendarClock,
    title: "Scheduled delivery",
    desc: "Give us a two-hour window instead of a whole day. The agent shows up inside it, not around it.",
  },
  {
    icon: Truck,
    title: "Standard delivery",
    desc: "Our everyday service for parcels that aren't racing the clock, priced by weight and distance, nothing else.",
  },
  {
    icon: Building2,
    title: "Merchant & bulk shipping",
    desc: "Volume pickups, a dedicated routing dashboard, and pricing that gets better the more you ship.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & fulfillment",
    desc: "Store stock at one of our hubs and we pick, pack, and hand it to an agent when an order comes in.",
    
  },
  {
    icon: RotateCcw,
    title: "Returns & exchanges",
    desc: "A return is a pickup we arrange, not a counter your customer has to find. We collect it from their door.",
  },
];

const STEPS = [
  {
    title: "Book the pickup",
    desc: "Tell us what it is and where it's going. You get a rate before you confirm anything.",
  },
  {
    title: "An agent collects it",
    desc: "Pickup happens at the address you gave us, no drop-off point required.",
  },
  {
    title: "It moves through the network",
    desc: "Same city, it goes straight to the recipient. Different city, it clears through the nearest hub first.",
  },
  {
    title: "OTP-confirmed handoff",
    desc: "The recipient gets a one-time code and shares it with the agent. That's the proof of delivery.",
  },
];

const STATS = [
  { value: "64", label: "districts covered" },
  { value: "24/7", label: "customer support" },
  { value: "100%", label: "OTP-verified handoffs" },
  { value: "0", label: "hidden fees on your invoice" },
];

const Services = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#EEEAF6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F0FE] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#7C3AED]">
              SERVICES
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-[#14121F] sm:text-6xl">
              Delivery that
              <br />
              keeps its promises.
            </h1>
            <p className="mt-6 max-w-md text-lg text-[#6B6478]">
              From a same-day envelope to a warehouse pallet, every parcel
              moves through the same reliable network of agents, hubs, and
              OTP-verified handoffs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9]"
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DCD3F5] px-6 py-3 text-sm font-semibold text-[#14121F] transition-colors hover:border-[#7C3AED] hover:text-[#7C3AED]"
              >
                Track a shipment
              </Link>
            </div>
          </div>

          {/* Route illustration */}
          <div className="relative mx-auto hidden h-72 w-full max-w-sm lg:block">
            <svg
              viewBox="0 0 320 280"
              className="h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M40 220 C 90 220, 90 140, 140 140 S 210 60, 280 60"
                fill="none"
                stroke="#DCD3F5"
                strokeWidth="3"
                strokeDasharray="2 10"
                strokeLinecap="round"
              />
              <circle cx="40" cy="220" r="9" fill="#14121F" />
              <circle cx="280" cy="60" r="9" fill="#7C3AED" />
              <circle cx="140" cy="140" r="5" fill="#7C3AED" opacity="0.5" />
              <text
                x="40"
                y="245"
                textAnchor="middle"
                className="fill-[#6B6478]"
                style={{ font: "600 11px system-ui" }}
              >
                Pickup
              </text>
              <text
                x="280"
                y="42"
                textAnchor="middle"
                className="fill-[#7C3AED]"
                style={{ font: "600 11px system-ui" }}
              >
                Delivered
              </text>
            </svg>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-[#EEEAF6] bg-[#FAF8FF]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:px-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-[#14121F]">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-[#6B6478]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-[#14121F] sm:text-4xl">
            Six ways to ship
          </h2>
          <p className="mt-3 text-[#6B6478]">
            Pick the service that matches how urgent the parcel is, not the
            other way around.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-[#EEEAF6] p-6 transition-colors hover:border-[#7C3AED]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F5F0FE] text-[#7C3AED]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-bold text-[#14121F]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B6478]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="border-y border-[#EEEAF6] bg-[#FAF8FF]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <h2 className="text-3xl font-black tracking-tight text-[#14121F] sm:text-4xl">
            How a parcel actually moves
          </h2>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14121F] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="hidden h-px flex-1 bg-[#DCD3F5] lg:block" />
                  )}
                </div>
                <h3 className="mt-4 font-bold text-[#14121F]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6478]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F5F0FE] text-[#7C3AED]">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-[#14121F]">
                Every delivery is OTP-verified
              </h3>
              <p className="mt-1 text-sm text-[#6B6478]">
                No parcel is marked delivered without the recipient's code.
                It's the one step nobody can skip.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F5F0FE] text-[#7C3AED]">
              <MapPinned className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-[#14121F]">
                Coverage across all 64 districts
              </h3>
              <p className="mt-1 text-sm text-[#6B6478]">
                If it has an address in the country, we have a route to it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-[#14121F] p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Ready to send something?
            </h2>
            <p className="mt-2 text-[#B8AFDA]">
              Tell us what it is and where it's going — we'll quote it on the
              spot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8B5CF6]"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+880"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              <PhoneCall className="h-4 w-4" />
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;