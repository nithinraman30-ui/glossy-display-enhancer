import { motion } from "motion/react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlossCard, Reveal, SectionHeading } from "./ui-bits";
import { DRIVERS, initials } from "./data";

const PRECAUTIONS = [
  "🏍️ Wear helmet on bikes & scooters",
  "🚗 Wear seat belt in cars",
  "📱 Never use phone while driving",
  "📍 Confirm pickup before boarding",
  "🪪 Check driver & vehicle verification",
  "🚨 Use SOS for emergencies",
];

export function Verification() {
  return (
    <section id="verification" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Driver transparency"
          title="Know who you're"
          highlight="riding with."
          copy="Review identity, licence, vehicle, ratings and ride history before requesting a shared ride."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DRIVERS.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.05}>
              <GlossCard className="group h-full p-5">
                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: -6, scale: 1.06 }}
                    className="grid size-14 place-items-center rounded-2xl bg-gradient-accent font-display text-lg font-bold text-accent-foreground shadow-soft"
                  >
                    {initials(d.name)}
                  </motion.span>
                  <span className="grid">
                    <b>{d.name}</b>
                    <small className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-gold text-gold" /> {d.rating} · {d.reviews}{" "}
                      ratings
                    </small>
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {d.vehicle} · {d.model}
                  <br />
                  {d.plate} · {d.fuel}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                  {["Identity", "Licence", "Vehicle"].map((t) => (
                    <span key={t} className="rounded-full bg-primary/12 px-2 py-1 text-primary">
                      ✓ {t}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() =>
                    toast.success(`${d.name} · ${d.plate} — all documents verified by Ride Sync.`)
                  }
                >
                  View verified profile →
                </Button>
              </GlossCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <GlossCard className="mt-8 p-6" hover={false}>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-primary text-xl text-primary-foreground">
                🛡️
              </span>
              <span className="grid">
                <b>Ride precautions</b>
                <small className="text-sm text-muted-foreground">
                  Simple habits for safer shared travel.
                </small>
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {PRECAUTIONS.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-full border border-border/70 bg-secondary/60 px-3.5 py-2 text-sm transition-transform hover:-translate-y-0.5"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </GlossCard>
        </Reveal>
      </div>
    </section>
  );
}
