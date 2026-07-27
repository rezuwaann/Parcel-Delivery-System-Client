import { Zap, Clock, Globe2, ShieldCheck, MapPinned, Boxes } from "lucide-react";

const SERVICES = [
  {
    icon: Zap,
    title: "Same-day delivery",
    desc: "Dropped off before noon, handed over before dinner. For the stuff that can't wait.",
  },
  {
    icon: Clock,
    title: "Scheduled delivery",
    desc: "Pick a two-hour window that works for you. We show up inside it, every time.",
  },
  {
    icon: Boxes,
    title: "Bulk & business",
    desc: "Corporate accounts, warehouse pickup, and multi-stop routes built for volume.",
  },
  {
    icon: Globe2,
    title: "International shipping",
    desc: "Customs paperwork handled, duties calculated up front, tracked door to door.",
  },
  {
    icon: ShieldCheck,
    title: "Insured & fragile",
    desc: "Extra padding, extra care, and coverage that actually pays out if something breaks.",
  },
  {
    icon: MapPinned,
    title: "Live tracking",
    desc: "Watch the pin move in real time, from the warehouse shelf to your front door.",
  },
];

const PinBadge = ({ Icon }) => {
  return (
    <div className="relative h-14 w-14 shrink-0">
      <div className="absolute inset-0 rotate-45 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_8px_20px_-6px_rgba(124,58,237,0.55)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-6 w-6 text-white" strokeWidth={2} />
      </div>
    </div>
  );
};

const Services = () => {
    return (
        <div className="w-full bg-white px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-2xl">
              <span className="mb-4 inline-block rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6D28D9]">
                What we deliver
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[#1E1B2E] sm:text-5xl">
                Services built around
                <br />
                <span className="text-[#7C3AED]">every kind of parcel</span>
              </h2>
              <p className="mt-4 text-lg text-[#6B6478]">
                From a same-day envelope to a pallet of freight, one platform
                routes it, tracks it, and gets it there.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-[0_1px_2px_rgba(30,27,46,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_20px_40px_-16px_rgba(124,58,237,0.28)]"
                >
                  <PinBadge Icon={Icon} />
                  <h3 className="mt-5 text-lg font-semibold text-[#1E1B2E]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6478]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
};

export default Services;