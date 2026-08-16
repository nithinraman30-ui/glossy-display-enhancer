import { motion } from "motion/react";
import { GlossCard, Reveal, SectionHeading } from "./ui-bits";

const STEPS = [
  {
    n: "01",
    icon: "🔐",
    title: "Verify once",
    copy: "Sign up with phone OTP and add identity, licence and vehicle details for verification.",
  },
  {
    n: "02",
    icon: "🧭",
    title: "Post or find a ride",
    copy: "Drivers share empty seats on their existing route; passengers search matching pickups.",
  },
  {
    n: "03",
    icon: "🤝",
    title: "Match & confirm",
    copy: "Review verified profiles, ratings and fare split, then confirm the shared ride.",
  },
  {
    n: "04",
    icon: "🛰️",
    title: "Travel tracked",
    copy: "Follow the live route, share it with a guardian and use SOS if anything feels off.",
  },
];

const SPRINTS = [
  { s: "Sprint 1", t: "Research & requirements", done: true },
  { s: "Sprint 2", t: "UI design & prototype", done: true },
  { s: "Sprint 3", t: "Ride matching & fares", done: true },
  { s: "Sprint 4", t: "Tracking & safety layer", done: false },
  { s: "Sprint 5", t: "Testing & deployment", done: false },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-surface/70 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps from"
          highlight="request to arrival."
          copy="A single flow built on verification, transparency and shared cost."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <GlossCard className="h-full p-5">
                <div className="flex items-center justify-between">
                  <motion.span
                    whileHover={{ scale: 1.12, rotate: 8 }}
                    className="grid size-12 place-items-center rounded-2xl bg-gradient-primary text-xl text-primary-foreground shadow-glow"
                  >
                    {s.icon}
                  </motion.span>
                  <b className="font-display text-2xl text-muted-foreground/40">{s.n}</b>
                </div>
                <b className="mt-4 block">{s.title}</b>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.copy}</p>
              </GlossCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <GlossCard className="mt-8 p-6" hover={false}>
            <b className="font-display text-lg">Agile project roadmap</b>
            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {SPRINTS.map((sp, i) => (
                <motion.div
                  key={sp.s}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={
                    "rounded-2xl border px-4 py-3 " +
                    (sp.done
                      ? "border-primary/30 bg-primary/10"
                      : "border-dashed border-border bg-secondary/50")
                  }
                >
                  <small className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {sp.s}
                  </small>
                  <b className="mt-1 block text-sm">{sp.t}</b>
                  <small className={sp.done ? "text-xs text-primary" : "text-xs text-muted-foreground"}>
                    {sp.done ? "✓ Completed" : "In progress"}
                  </small>
                </motion.div>
              ))}
            </div>
          </GlossCard>
        </Reveal>
      </div>
    </section>
  );
}
