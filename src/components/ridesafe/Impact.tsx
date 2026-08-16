import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter, GlossCard, Reveal, SectionHeading } from "./ui-bits";
import { useAuth } from "./auth-context";

const STATS = [
  { to: 62, suffix: "%", label: "Cars run with empty seats in city commutes" },
  { to: 3.4, suffix: "x", label: "Cheaper than solo cab travel when shared", decimals: 1 },
  { to: 40, suffix: "%", label: "Lower per-person emissions on shared routes" },
  { to: 100, suffix: "%", label: "Rides require verified driver documents" },
];

export function Impact() {
  const { open } = useAuth();

  return (
    <section id="impact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why it matters"
          title="Fewer empty seats,"
          highlight="lighter roads."
          copy="Shared mobility reduces cost, congestion and emissions at the same time."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <GlossCard className="h-full p-6" sheen>
                <strong className="font-display text-4xl text-gradient">
                  <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </strong>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </GlossCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="glossy relative mt-10 overflow-hidden rounded-[2rem] bg-gradient-primary p-8 text-primary-foreground shadow-elegant md:p-12">
            <span className="gloss-layer rounded-[2rem]" aria-hidden />
            <span className="sheen-sweep" aria-hidden />
            <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h3 className="font-display text-3xl md:text-4xl">
                  Ready to share your first ride?
                </h3>
                <p className="mt-3 max-w-lg text-primary-foreground/80">
                  Join as a passenger, driver or delivery partner. Verification takes a minute and
                  every ride stays trackable.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button variant="gold" size="lg" onClick={() => open({})}>
                  Get started <ArrowRight className="size-4" />
                </Button>
                <Button variant="glass" size="lg" onClick={() => open({})}>
                  Offer a seat
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
