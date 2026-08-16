import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Eyebrow, GlossCard, Reveal } from "./ui-bits";
import { FARE_RATES } from "./data";

const VEHICLES = ["Car", "Bike", "Scooty", "EV", "Goods"];

export function Fare() {
  const [vehicle, setVehicle] = useState("Car");
  const [distance, setDistance] = useState(12);
  const [passengers, setPassengers] = useState(2);

  const { total, perHead } = useMemo(() => {
    const rate = FARE_RATES[vehicle] ?? FARE_RATES["Car"]!;
    const t = Math.round(rate.base + rate.perKm * Math.max(1, distance));
    return { total: t, perHead: Math.ceil(t / Math.max(1, passengers)) };
  }, [vehicle, distance, passengers]);

  return (
    <section id="fare" className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Low-fare shared travel</Eyebrow>
          <h2 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-[2.75rem]">
            Fair fares, <span className="text-gradient">not inflated fares.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Estimate a transparent shared contribution using vehicle type, distance and the number
            of passengers splitting the trip. This is a project-demo fare model.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {VEHICLES.map((v) => (
              <button
                key={v}
                onClick={() => setVehicle(v)}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 " +
                  (vehicle === v
                    ? "border-primary/40 bg-gradient-primary text-primary-foreground shadow-glow"
                    : "border-border/70 bg-card/70 text-muted-foreground")
                }
              >
                {v}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <GlossCard className="p-6" sheen hover={false}>
            <div className="flex items-center justify-between">
              <b className="font-display text-lg">Fare estimator</b>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                Demo
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-1.5 text-sm">
                <span className="flex justify-between text-muted-foreground">
                  Distance <b className="text-foreground">{distance} km</b>
                </span>
                <input
                  type="range"
                  min={1}
                  max={400}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="h-2 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="flex justify-between text-muted-foreground">
                  Passengers sharing <b className="text-foreground">{passengers}</b>
                </span>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="h-2 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                />
              </label>
            </div>

            <div className="mt-6 rounded-3xl bg-ink p-5 text-primary-foreground">
              <small className="text-[11px] tracking-[0.18em] text-primary-foreground/60 uppercase">
                Estimated contribution
              </small>
              <motion.strong
                key={perHead}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mt-1 block font-display text-5xl"
              >
                ₹{perHead}
              </motion.strong>
              <div className="mt-3 flex items-center justify-between text-sm text-primary-foreground/70">
                <span>Total trip ₹{total}</span>
                <span>
                  {vehicle} · {distance} km · {passengers} sharing
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Final fare can vary by actual route, tolls and platform rules.
            </p>
          </GlossCard>
        </Reveal>
      </div>
    </section>
  );
}
