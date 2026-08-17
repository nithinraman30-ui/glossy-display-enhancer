import { toast } from "sonner";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { GlossCard, Reveal, SectionHeading } from "./ui-bits";
import { useAuth } from "./auth-context";

export function Services() {
  const { open, setWomenMode } = useAuth();

  const scrollTo = (id: string) =>
    goToView(id);

  const SERVICES = [
    {
      n: "01",
      icon: "🚗",
      t: "Car Ride Sharing",
      c: "Share empty seats in personal cars with passengers travelling similar routes.",
      cta: "Book a car ride",
      act: () => scrollTo("rides"),
      dark: true,
    },
    {
      n: "02",
      icon: "🏍️",
      t: "Bike Ride Sharing",
      c: "Affordable two-wheeler travel for short city journeys with verified partners.",
      cta: "Find a bike ride",
      act: () => scrollTo("rides"),
    },
    {
      n: "03",
      icon: "🛣️",
      t: "Inter-City Travel",
      c: "Connect with people travelling between cities and share the journey.",
      cta: "Plan a trip",
      act: () => scrollTo("rides"),
    },
    {
      n: "04",
      icon: "♀",
      t: "Women-for-Women",
      c: "Female passengers can choose a women-driver preference whenever available.",
      cta: "Enable women mode",
      act: () => {
        setWomenMode(true);
        toast.success("Women-for-Women preference enabled across the marketplace.");
        scrollTo("rides");
      },
    },
    {
      n: "05",
      icon: "📍",
      t: "Live Trip Tracking",
      c: "Share real-time journey status with parents, guardians or trusted contacts.",
      cta: "View tracking",
      act: () => scrollTo("tracking"),
    },
    {
      n: "06",
      icon: "₹",
      t: "Smart Cost Sharing",
      c: "Estimate and divide eligible travel costs by vehicle and fuel type.",
      cta: "Calculate fare",
      act: () => scrollTo("fare"),
    },
  ];

  return (
    <section id="services" className="relative bg-surface/70 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Our services"
          title="One platform."
          highlight="Many ways to move."
          copy="City rides, inter-city journeys, bikes, smart matching and safety tools designed around real passengers and drivers."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <GlossCard
                sheen={Boolean(s.dark)}
                className={
                  "group h-full p-6 " + (s.dark ? "border-transparent bg-ink text-primary-foreground" : "")
                }
              >
                <div className="flex items-start justify-between">
                  <span
                    className={
                      "grid size-12 place-items-center rounded-2xl text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 " +
                      (s.dark ? "bg-primary-foreground/12" : "bg-gradient-primary/10 bg-secondary")
                    }
                  >
                    {s.icon}
                  </span>
                  <b
                    className={
                      "font-display text-sm tracking-[0.2em] " +
                      (s.dark ? "text-primary-foreground/50" : "text-muted-foreground")
                    }
                  >
                    {s.n}
                  </b>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.t}</h3>
                <p
                  className={
                    "mt-2 text-sm " + (s.dark ? "text-primary-foreground/70" : "text-muted-foreground")
                  }
                >
                  {s.c}
                </p>
                <button
                  onClick={s.act}
                  className={
                    "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-3 " +
                    (s.dark ? "text-primary-glow" : "text-primary")
                  }
                >
                  {s.cta} <span aria-hidden>→</span>
                </button>
              </GlossCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <motion.div
            className="glossy mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-primary/20 bg-card/80 p-5 shadow-glow backdrop-blur"
            whileHover={{ scale: 1.01 }}
          >
            <span className="gloss-layer rounded-3xl" aria-hidden />
            <span className="sheen-sweep" aria-hidden />
            <div className="relative flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-accent text-accent-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="grid">
                <b>AI-powered route matching</b>
                <small className="text-sm text-muted-foreground">
                  Route similarity + timing + vehicle type + preferences
                </small>
              </span>
            </div>
            <strong className="relative rounded-full bg-gradient-gold px-4 py-2 text-sm font-bold tracking-wider text-gold-foreground uppercase">
              96% match
            </strong>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
