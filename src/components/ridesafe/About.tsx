import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "./ui-bits";
import { goToView } from "./view-context";

const NODES = [
  { icon: "👤", label: "Passenger", pos: "top-2 left-1/2 -translate-x-1/2" },
  { icon: "🚗", label: "Driver", pos: "right-2 top-1/2 -translate-y-1/2" },
  { icon: "🛡️", label: "Guardian", pos: "bottom-2 left-1/2 -translate-x-1/2" },
  { icon: "⚙️", label: "Admin", pos: "left-2 top-1/2 -translate-y-1/2" },
];

const CHECKS = [
  "Reduce unnecessary trips",
  "Lower travel cost",
  "Improve vehicle occupancy",
  "Build a trusted community",
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <div className="glossy relative rounded-[2rem] border border-border/70 bg-ink p-6 shadow-elegant">
            <span className="gloss-layer rounded-[2rem]" aria-hidden />
            <div className="relative">
              <small className="text-[11px] font-semibold tracking-[0.18em] text-primary-foreground/60 uppercase">
                Ride Sync ecosystem • 2026
              </small>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-sm">
                <div
                  className="animate-spin-slow absolute inset-6 rounded-full border border-dashed border-primary-foreground/20"
                  aria-hidden
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-gradient-primary font-display text-3xl font-bold text-primary-foreground shadow-glow"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  R
                </motion.div>
                {NODES.map((n, i) => (
                  <motion.div
                    key={n.label}
                    className={`absolute ${n.pos} grid place-items-center gap-1 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-2 backdrop-blur`}
                    animate={{ y: [0, i % 2 ? 8 : -8, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-xl">{n.icon}</span>
                    <small className="text-[10px] font-semibold tracking-wider text-primary-foreground/75 uppercase">
                      {n.label}
                    </small>
                  </motion.div>
                ))}
                <svg className="absolute inset-0 size-full" aria-hidden>
                  <circle
                    cx="50%"
                    cy="50%"
                    r="33%"
                    fill="none"
                    stroke="oklch(1 0 0 / 0.18)"
                    strokeWidth="1.5"
                    strokeDasharray="5 8"
                    className="animate-dash"
                  />
                </svg>
              </div>
              <footer className="mt-4 flex items-center justify-between rounded-2xl bg-primary-foreground/10 px-4 py-3 text-primary-foreground">
                <small className="text-[10px] tracking-[0.18em] uppercase opacity-70">
                  Connected
                </small>
                <b className="text-sm">Safe mobility for everyone</b>
              </footer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Eyebrow>About Ride Sync</Eyebrow>
          <h2 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-[2.75rem]">
            Transportation should be <span className="text-gradient">shared, smart and safe.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            The growing number of private vehicles creates congestion, higher travel cost, excess
            fuel use and pollution. Ride Sync makes better use of the empty seats already moving
            through the city.
          </p>
          <p className="mt-3 text-muted-foreground">
            Citizens register their vehicles and offer rides to passengers travelling the same
            direction. Smart matching, live tracking, secure payments and safety tools work together
            in one community ecosystem.
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {CHECKS.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-2 rounded-2xl bg-secondary/60 px-3.5 py-2.5 text-sm"
              >
                <Check className="size-4 text-primary" /> {c}
              </motion.span>
            ))}
          </div>
          <Button
            variant="ink"
            size="lg"
            className="mt-7"
            onClick={() =>
              goToView("services")
            }
          >
            Explore our services <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
