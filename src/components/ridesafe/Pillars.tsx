import { Reveal, GlossCard } from "./ui-bits";

const PILLARS = [
  { n: "01", t: "Community Rides", c: "Use empty seats in personal vehicles" },
  { n: "02", t: "Smart Matching", c: "Route + time based matching" },
  { n: "03", t: "Safety Network", c: "Verification + tracking + SOS" },
  { n: "04", t: "Cost Sharing", c: "Fair travel cost by vehicle type" },
];

const MARQUEE = [
  "Verified KYC drivers",
  "Women-for-Women rides",
  "Guardian live tracking",
  "One-tap SOS",
  "Low shared fares",
  "EV & bike options",
  "Inter-city journeys",
  "Goods & delivery",
];

export function Pillars() {
  return (
    <section className="relative -mt-6 pb-6">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <GlossCard className="h-full p-5">
              <b className="font-display text-sm tracking-[0.2em] text-primary">{p.n}</b>
              <strong className="mt-2 block font-display text-lg">{p.t}</strong>
              <small className="mt-1 block text-sm text-muted-foreground">{p.c}</small>
            </GlossCard>
          </Reveal>
        ))}
      </div>

      <div className="relative mt-12 overflow-hidden border-y border-border/60 bg-ink py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-primary-foreground/80 uppercase"
            >
              <i className="size-1.5 rounded-full bg-gradient-gold" />
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
