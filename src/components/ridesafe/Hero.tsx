import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Bike, MapPin, Navigation, ShieldCheck, Sparkles, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter, Eyebrow } from "./ui-bits";
import { useAuth } from "./auth-context";
import { goToView } from "./view-context";

const CHIPS = [
  { label: "City Ride", icon: "🏙️" },
  { label: "Inter-City", icon: "🛣️" },
  { label: "Women Only", icon: "♀" },
  { label: "Bike", icon: "🏍️" },
];

export function Hero() {
  const { open, setWomenMode } = useAuth();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [chip, setChip] = useState("City Ride");

  const findRide = () => {
    if (!pickup.trim() || !drop.trim()) {
      toast.error("Please enter both pickup and destination.");
      return;
    }
    if (!signedIn) {
      toast("Login or sign up to open the ride marketplace.");
      open();
      return;
    }
    goToView("rides");
    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("ridesafe:search", { detail: { from: pickup, to: drop, mode: chip } }),
      );
    }, 250);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-hero pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 size-[26rem] rounded-full bg-primary/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 size-[22rem] rounded-full bg-accent/25 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 11, repeat: Infinity }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>Community powered • safety first</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="mt-6 text-4xl leading-[1.02] font-semibold sm:text-5xl md:text-6xl"
          >
            Share the ride.
            <br />
            <span className="text-gradient">Share the journey.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            A smart ride-sharing platform for affordable city and inter-city travel — connecting
            passengers with verified people already travelling their way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="glossy mt-8 rounded-3xl border border-border/70 bg-card/85 p-3 shadow-elegant backdrop-blur-xl"
          >
            <span className="gloss-layer rounded-3xl" aria-hidden />
            <div className="relative grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <label className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3 transition focus-within:bg-secondary">
                <MapPin className="size-4 text-primary" />
                <span className="grid">
                  <small className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    Pickup
                  </small>
                  <input
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3 transition focus-within:bg-secondary">
                <Navigation className="size-4 text-accent" />
                <span className="grid">
                  <small className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    Destination
                  </small>
                  <input
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Where are you going?"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && findRide()}
                  />
                </span>
              </label>
              <Button variant="hero" size="lg" className="md:h-auto" onClick={findRide}>
                Find a ride <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>

          <div className="mt-5 flex flex-wrap gap-2">
            {CHIPS.map((c, i) => (
              <motion.button
                key={c.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.32 + i * 0.06 }}
                onClick={() => {
                  setChip(c.label);
                  if (c.label === "Women Only") {
                    setWomenMode(true);
                    toast.success("Women-for-Women preference selected.");
                  } else {
                    toast(`${c.label} selected — enter pickup and destination.`);
                  }
                }}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 " +
                  (chip === c.label
                    ? "border-primary/40 bg-gradient-primary text-primary-foreground shadow-glow"
                    : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground")
                }
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-9 grid max-w-lg grid-cols-3 gap-4">
            {[
              { v: 10, s: "K+", l: "Verified partners", d: 0 },
              { v: 50, s: "K+", l: "Safe rides", d: 0 },
              { v: 4.9, s: "/5", l: "Rider rating", d: 1 },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border/60 bg-card/60 p-3.5">
                <b className="font-display text-2xl">
                  <Counter to={s.v} suffix={s.s} decimals={s.d} />
                </b>
                <small className="mt-0.5 block text-xs text-muted-foreground">{s.l}</small>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual onLogin={() => open()} />
      </div>
    </section>
  );
}

function HeroVisual({ onLogin }: { onLogin: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div
        className="animate-spin-slow pointer-events-none absolute -inset-8 rounded-full border border-dashed border-primary/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-16 rounded-full border border-accent/15"
        aria-hidden
      />

      <div className="glossy rounded-[2rem] border border-border/70 bg-card/90 p-4 shadow-elegant backdrop-blur-xl">
        <span className="gloss-layer rounded-[2rem]" aria-hidden />
        <span className="sheen-sweep rounded-[2rem]" aria-hidden />
        <div className="relative">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] uppercase">
            <b className="text-muted-foreground">Smart route matching</b>
            <i className="flex items-center gap-1.5 text-primary not-italic">
              <span className="size-1.5 animate-blink rounded-full bg-primary" /> Live
            </i>
          </div>

          <div className="relative mt-3 h-56 overflow-hidden rounded-2xl bg-ink">
            <div className="noise absolute inset-0 opacity-30" aria-hidden />
            <svg viewBox="0 0 320 220" className="absolute inset-0 size-full">
              <g stroke="oklch(1 0 0 / 0.12)" strokeWidth="10" fill="none">
                <path d="M-10 60 H330" />
                <path d="M-10 150 H330" />
                <path d="M90 -10 V230" />
                <path d="M230 -10 V230" />
              </g>
              <path
                id="hero-route"
                d="M46 176 C 96 176 96 104 150 104 S 214 44 276 44"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M46 176 C 96 176 96 104 150 104 S 214 44 276 44"
                fill="none"
                stroke="oklch(1 0 0 / 0.5)"
                strokeWidth="2"
                strokeDasharray="6 10"
                className="animate-dash"
              />
              <circle cx="46" cy="176" r="9" fill="var(--color-primary-glow)" />
              <circle cx="276" cy="44" r="9" fill="var(--color-accent-glow)" />
            </svg>

            <motion.div
              className="absolute top-0 left-0 text-2xl"
              style={{ offsetPath: 'path("M46 176 C 96 176 96 104 150 104 S 214 44 276 44")' }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
            >
              🚗
            </motion.div>

            <span className="absolute bottom-3 left-3 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold tracking-wider text-gold-foreground uppercase">
              AI match 96%
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3 text-sm">
            <span className="grid">
              <small className="text-[10px] tracking-widest text-muted-foreground">FROM</small>
              <b>Chennai</b>
            </span>
            <Route className="size-4 text-primary" />
            <span className="grid text-right">
              <small className="text-[10px] tracking-widest text-muted-foreground">TO</small>
              <b>Bengaluru</b>
            </span>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onLogin}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -top-6 -left-4 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-left shadow-elegant sm:flex"
      >
        <ShieldCheck className="size-5 text-primary" />
        <span className="grid">
          <b className="text-xs">Driver verified</b>
          <small className="text-[10px] text-muted-foreground">KYC + licence + vehicle</small>
        </span>
      </motion.button>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -right-3 bottom-16 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-elegant sm:flex"
      >
        <Sparkles className="size-5 text-accent" />
        <span className="grid">
          <b className="text-xs">Guardian tracking</b>
          <small className="text-[10px] text-muted-foreground">Live trip shared securely</small>
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -bottom-7 left-4 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-elegant"
      >
        <Bike className="size-5 text-primary" />
        <span className="grid">
          <b className="text-xs">Women-first rides</b>
          <small className="text-[10px] text-muted-foreground">Choose verified women drivers</small>
        </span>
      </motion.div>
    </motion.div>
  );
}
