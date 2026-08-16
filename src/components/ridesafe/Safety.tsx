import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Phone, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "./ui-bits";
import { useAuth } from "./auth-context";

const POINTS = [
  "Identity, driving licence and vehicle verification",
  "Live location sharing with guardians",
  "Women-only driver preference",
  "One-tap Emergency SOS",
  "Verified ratings and ride history",
];

export function Safety() {
  const { open } = useAuth();

  const sos = () =>
    toast.error("🚨 SOS demo activated — trusted contacts and support would be alerted instantly.", {
      duration: 4500,
    });

  return (
    <section id="safety" className="relative overflow-hidden bg-ink py-20 text-primary-foreground md:py-28">
      <div className="noise pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 size-[24rem] rounded-full bg-primary/30 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <Eyebrow className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground/80">
            Safety center
          </Eyebrow>
          <h2 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-5xl">
            Safety isn&apos;t a feature.
            <br />
            <span className="text-gradient">It&apos;s the foundation.</span>
          </h2>
          <p className="mt-5 max-w-lg text-primary-foreground/70">
            Verification and emergency support are part of the journey from the moment a ride is
            requested.
          </p>
          <ul className="mt-6 grid gap-2">
            {POINTS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 rounded-2xl border border-primary-foreground/12 bg-primary-foreground/8 px-4 py-2.5 text-sm"
              >
                <span className="text-primary-glow">✓</span> {p}
              </motion.li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="gold" size="lg" onClick={() => open({ guardian: true })}>
              Create safety profile <ArrowRight className="size-4" />
            </Button>
            <Button variant="sos" size="lg" onClick={sos}>
              <ShieldAlert className="size-4" /> Trigger SOS demo
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-[19rem]">
            <span
              className="absolute inset-0 -z-10 animate-pulse-ring rounded-[3rem] bg-primary/25"
              aria-hidden
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="glossy rounded-[2.5rem] border border-primary-foreground/15 bg-primary-foreground/8 p-3 shadow-elegant backdrop-blur-xl"
            >
              <span className="gloss-layer rounded-[2.5rem]" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] bg-card text-card-foreground">
                <header className="flex items-center justify-between px-4 py-3 text-sm font-semibold">
                  <span>‹</span>
                  <b>Active ride</b>
                  <span>•••</span>
                </header>
                <div className="relative h-40 bg-ink">
                  <svg viewBox="0 0 300 160" className="absolute inset-0 size-full">
                    <g stroke="oklch(1 0 0 / 0.12)" strokeWidth="10" fill="none">
                      <path d="M-10 55 H310" />
                      <path d="M-10 120 H310" />
                      <path d="M110 -10 V170" />
                    </g>
                    <path
                      d="M30 130 C 90 130 110 60 270 40"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <motion.span
                    className="absolute top-0 left-0 text-xl"
                    style={{ offsetPath: 'path("M30 130 C 90 130 110 60 270 40")' }}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                  >
                    🚙
                  </motion.span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                    AK
                  </span>
                  <span className="grid flex-1">
                    <b className="text-sm">Ananya Kumar</b>
                    <small className="text-xs text-muted-foreground">Verified • 4.9 ★</small>
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label="Call driver"
                    onClick={() => toast("Masked call placed to your driver.")}
                  >
                    <Phone className="size-4" />
                  </Button>
                </div>
                <div className="mx-4 rounded-2xl bg-primary/12 px-3.5 py-2.5">
                  <b className="flex items-center gap-2 text-xs text-primary">
                    <span className="size-1.5 animate-blink rounded-full bg-primary" /> Guardian
                    tracking ON
                  </b>
                  <small className="text-xs text-muted-foreground">
                    Priya • Live location shared
                  </small>
                </div>
                <div className="p-4">
                  <Button variant="sos" className="w-full" onClick={sos}>
                    SOS Emergency
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
