import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Clock, MapPin, Package, Phone, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlossCard, Reveal, SectionHeading } from "./ui-bits";
import { DRIVERS, FARE_RATES, PASSENGERS, initials, routeKm, type Driver } from "./data";
import { useAuth } from "./auth-context";

type Mode = "find" | "share" | "delivery";
const VEHICLES = ["All", "Car", "Bike", "Scooty", "EV"] as const;
const GENDERS = ["Any", "Female", "Male"] as const;

export function RideMarket() {
  const { open, womenMode } = useAuth();
  const [mode, setMode] = useState<Mode>("find");
  const [from, setFrom] = useState("Tambaram");
  const [to, setTo] = useState("Guindy");
  const [vehicle, setVehicle] = useState<string>("All");
  const [gender, setGender] = useState<string>("Any");
  const [results, setResults] = useState<Driver[]>(DRIVERS.slice(0, 4));
  const [selected, setSelected] = useState<Driver | null>(null);

  useEffect(() => {
    if (womenMode) setGender("Female");
  }, [womenMode]);

  const runSearch = (f = from, t = to, v = vehicle, g = gender) => {
    if (!f.trim() || !t.trim()) {
      toast.error("Enter both pickup and destination first.");
      return;
    }
    const km = routeKm(f, t);
    let list = DRIVERS.filter(
      (r) => (v === "All" || r.vehicle === v) && (g === "Any" || r.gender === g),
    );
    if (!list.length) list = DRIVERS.filter((r) => g === "Any" || r.gender === g);
    const priced = list.map((r) => {
      const rate = FARE_RATES[r.vehicle] ?? FARE_RATES["Car"]!;
      const total = Math.round(rate.base + rate.perKm * km);
      return {
        ...r,
        from: f,
        to: t,
        distance: `${km.toFixed(1)} km`,
        fare: Math.ceil(total / Math.max(1, r.seats)),
      };
    });
    setResults(priced);
    toast.success(
      `${priced.length} verified driver${priced.length === 1 ? "" : "s"} matched for ${f} → ${t}.`,
    );
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ from: string; to: string; mode: string }>).detail;
      setMode("find");
      setFrom(d.from);
      setTo(d.to);
      const v = d.mode === "Bike" ? "Bike" : "All";
      const g = d.mode === "Women Only" ? "Female" : gender;
      setVehicle(v);
      setGender(g);
      runSearch(d.from, d.to, v, g);
    };
    window.addEventListener("ridesafe:search", handler);
    return () => window.removeEventListener("ridesafe:search", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  return (
    <section id="rides" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Live ride marketplace"
          title="Find people"
          highlight="going your way."
          copy="See who is already travelling your route, choose a verified driver, or share your own empty seats."
        />

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {(
              [
                { id: "find", label: "🚕 Get Ride Sync" },
                { id: "share", label: "🧑‍✈️ Share Ride Sync" },
                { id: "delivery", label: "📦 Goods / Delivery" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                className={
                  "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors " +
                  (mode === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")
                }
              >
                {mode === t.id && (
                  <motion.span
                    layoutId="ride-tab"
                    className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {mode === "find" && (
            <motion.div
              key="find"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              <div className="glossy rounded-3xl border border-border/70 bg-card/85 p-4 shadow-elegant backdrop-blur">
                <span className="gloss-layer rounded-3xl" aria-hidden />
                <div className="relative grid gap-3 md:grid-cols-[1fr_1fr_auto_auto_auto]">
                  <Field label="From">
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="e.g. Tambaram"
                    />
                  </Field>
                  <Field label="To">
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="e.g. Guindy"
                      onKeyDown={(e) => e.key === "Enter" && runSearch()}
                    />
                  </Field>
                  <Field label="Vehicle">
                    <select
                      className="w-full cursor-pointer bg-transparent text-sm outline-none"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                    >
                      {VEHICLES.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Driver gender">
                    <select
                      className="w-full cursor-pointer bg-transparent text-sm outline-none"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      {GENDERS.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </Field>
                  <Button variant="hero" size="lg" onClick={() => runSearch()}>
                    Find rides
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {results.map((r, i) => (
                    <motion.article
                      key={`${r.id}-${r.from}-${r.to}`}
                      layout
                      initial={{ opacity: 0, y: 22, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <GlossCard className="h-full p-5">
                        <div className="flex items-center gap-3">
                          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-primary font-display font-bold text-primary-foreground shadow-soft">
                            {initials(r.name)}
                          </span>
                          <span className="grid">
                            <b>{r.name}</b>
                            <small className="flex items-center gap-1 text-xs text-muted-foreground">
                              {r.gender} •{" "}
                              <Star className="size-3 fill-gold text-gold" aria-hidden />
                              <b className="text-foreground">{r.rating}</b> ({r.reviews})
                            </small>
                          </span>
                          <i className="ml-auto rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary not-italic uppercase">
                            ✓ Verified
                          </i>
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3">
                          <span className="grid text-sm">
                            <small className="text-[10px] tracking-widest text-muted-foreground">
                              FROM
                            </small>
                            <b>{r.from}</b>
                          </span>
                          <span className="relative mx-1 h-px flex-1 bg-border">
                            <motion.i
                              className="absolute -top-1 size-2 rounded-full bg-accent"
                              animate={{ left: ["0%", "100%"] }}
                              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </span>
                          <span className="grid text-right text-sm">
                            <small className="text-[10px] tracking-widest text-muted-foreground">
                              TO
                            </small>
                            <b>{r.to}</b>
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" /> {r.time}
                          </span>
                          <span>🚘 {r.vehicle}</span>
                          <span className="flex items-center gap-1">
                            <Users className="size-3" /> {r.seats} seats
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" /> {r.distance}
                          </span>
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                          <span className="grid">
                            <small className="text-[10px] tracking-widest text-muted-foreground">
                              SHARED CONTRIBUTION
                            </small>
                            <strong className="font-display text-2xl">
                              ₹{r.fare}
                              <em className="text-sm font-normal text-muted-foreground not-italic">
                                {" "}
                                / seat
                              </em>
                            </strong>
                          </span>
                          <Button variant="ink" onClick={() => setSelected(r)}>
                            View driver <ArrowRight className="size-4" />
                          </Button>
                        </div>
                      </GlossCard>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {mode === "share" && (
            <motion.div
              key="share"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              <SharePanel />
            </motion.div>
          )}

          {mode === "delivery" && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              <GlossCard className="flex flex-wrap items-center gap-6 bg-ink p-7 text-primary-foreground" sheen>
                <span className="grid size-16 place-items-center rounded-3xl bg-primary-foreground/12 text-3xl">
                  <Package className="size-7" />
                </span>
                <div className="min-w-60 flex-1">
                  <small className="text-[11px] font-semibold tracking-[0.18em] text-primary-foreground/60 uppercase">
                    Delivery partner
                  </small>
                  <h3 className="mt-1 text-2xl font-semibold">Transport goods safely</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">
                    Verified cars, bikes and EVs can support local goods movement and delivery jobs
                    with the same KYC and tracking layer.
                  </p>
                </div>
                <Button variant="gold" size="lg" onClick={() => open()}>
                  Become a delivery partner <ArrowRight className="size-4" />
                </Button>
              </GlossCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DriverDialog driver={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid rounded-2xl bg-secondary/60 px-4 py-2.5 transition focus-within:bg-secondary">
      <small className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </small>
      {children}
    </label>
  );
}

function SharePanel() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    vehicle: "Car",
    seats: 2,
    time: "18:30",
    fuel: "Petrol",
    women: false,
  });
  const [published, setPublished] = useState(false);

  const fare = useMemo(() => {
    const km = form.from && form.to ? routeKm(form.from, form.to) : 12;
    const rate = FARE_RATES[form.vehicle] ?? FARE_RATES["Car"]!;
    return Math.ceil((rate.base + rate.perKm * km) / Math.max(1, form.seats));
  }, [form]);

  const publish = () => {
    if (!form.from.trim() || !form.to.trim()) {
      toast.error("Enter starting point and destination.");
      return;
    }
    setPublished(true);
    toast.success(`Ride published — ${form.seats} seat(s) from ${form.from} to ${form.to}.`);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
      <GlossCard className="p-6" hover={false}>
        <small className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Publish your ride
        </small>
        <h3 className="mt-2 text-2xl font-semibold">Already going somewhere?</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Share your empty seats and split eligible travel costs.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Starting location"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />
          <Input
            placeholder="Destination"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
          />
          <select
            aria-label="Vehicle type"
            className="h-10 cursor-pointer rounded-xl border border-input bg-background px-3 text-sm outline-none"
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          >
            {["Car", "Bike", "Scooty", "EV"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <Input
            type="number"
            min={1}
            max={6}
            aria-label="Seats"
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: Number(e.target.value) || 1 })}
          />
          <Input
            type="time"
            aria-label="Departure time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <select
            aria-label="Fuel type"
            className="h-10 cursor-pointer rounded-xl border border-input bg-background px-3 text-sm outline-none"
            value={form.fuel}
            onChange={(e) => setForm({ ...form, fuel: e.target.value })}
          >
            {["Petrol", "Diesel", "CNG", "EV"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3 text-sm">
          <Checkbox
            checked={form.women}
            onCheckedChange={(v) => setForm({ ...form, women: Boolean(v) })}
            aria-label="Prefer female passengers"
          />
          Prefer female passengers
        </label>
        <Button variant="hero" size="lg" className="mt-4 w-full" onClick={publish}>
          Publish shared ride <ArrowRight className="size-4" />
        </Button>
      </GlossCard>

      <div className="grid gap-5">
        <GlossCard className="p-5" hover={false}>
          <div className="flex items-center justify-between">
            <b>Passenger preview</b>
            <i className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary not-italic uppercase">
              <span className="size-1.5 animate-blink rounded-full bg-primary" />
              {published ? "Published" : "Draft"}
            </i>
          </div>
          <div className="relative mt-3 h-28 overflow-hidden rounded-2xl bg-ink">
            <svg viewBox="0 0 300 110" className="absolute inset-0 size-full">
              <path
                d="M20 88 C 90 88 110 30 280 26"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="20" cy="88" r="6" fill="var(--color-primary-glow)" />
              <circle cx="280" cy="26" r="6" fill="var(--color-accent-glow)" />
            </svg>
            <motion.span
              className="absolute top-0 left-0 text-xl"
              style={{ offsetPath: 'path("M20 88 C 90 88 110 30 280 26")' }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            >
              {form.vehicle === "Bike" ? "🏍️" : form.vehicle === "Scooty" ? "🛵" : "🚗"}
            </motion.span>
          </div>
          <dl className="mt-3 grid gap-2 text-sm">
            {[
              ["Route", `${form.from || "Start"} → ${form.to || "Destination"}`],
              ["Seats", String(form.seats)],
              ["Vehicle", `${form.vehicle} · ${form.fuel}`],
              ["Departure", form.time],
              ["Estimated contribution", `₹${fare} / seat`],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-xl bg-secondary/60 px-3.5 py-2"
              >
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </GlossCard>

        <GlossCard className="p-5" hover={false}>
          <b>Passengers waiting on your route</b>
          <div className="mt-3 grid gap-2">
            {PASSENGERS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-3.5 py-2.5"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-gradient-accent text-xs font-bold text-accent-foreground">
                  {initials(p.name)}
                </span>
                <span className="grid flex-1">
                  <b className="text-sm">
                    {p.name} · {p.from} → {p.to}
                  </b>
                  <small className="text-xs text-muted-foreground">
                    {p.time} · {p.seats} seat · {p.pref}
                  </small>
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success(`Seat offered to ${p.name}. Waiting for confirmation.`)}
                >
                  Offer ₹{p.share}
                </Button>
              </motion.div>
            ))}
          </div>
        </GlossCard>
      </div>
    </div>
  );
}

function DriverDialog({ driver, onClose }: { driver: Driver | null; onClose: () => void }) {
  const [stage, setStage] = useState<"details" | "split">("details");
  const [riders, setRiders] = useState(2);

  useEffect(() => {
    if (driver) {
      setStage("details");
      setRiders(2);
    }
  }, [driver]);

  const total = driver ? driver.fare * riders : 0;
  const perHead = driver ? Math.round(total / riders) : 0;
  const platform = Math.round(total * 0.05);

  return (
    <Dialog open={Boolean(driver)} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="glossy rounded-3xl border-border/70 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <span className="gloss-layer" aria-hidden />
        {driver && stage === "split" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <DialogTitle className="text-xl">Split ride expenses</DialogTitle>
            <DialogDescription>
              Review the shared cost with {driver.name} before you confirm — no payment is taken
              until the driver accepts.
            </DialogDescription>

            <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Co-riders sharing</span>
                <span className="flex items-center gap-3">
                  <button
                    aria-label="Fewer co-riders"
                    className="grid size-8 place-items-center rounded-full bg-card font-bold"
                    onClick={() => setRiders((r) => Math.max(1, r - 1))}
                  >
                    −
                  </button>
                  <b className="font-display text-lg">{riders}</b>
                  <button
                    aria-label="More co-riders"
                    className="grid size-8 place-items-center rounded-full bg-card font-bold"
                    onClick={() => setRiders((r) => Math.min(driver.seats || 4, r + 1))}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>

            <dl className="mt-4 grid gap-2 text-sm">
              {[
                ["Fare per seat", `₹${driver.fare}`],
                ["Total trip cost", `₹${total}`],
                ["Platform support (5%)", `₹${platform}`],
                ["Your share", `₹${perHead}`],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between rounded-xl bg-secondary/60 px-3.5 py-2"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </motion.div>
              ))}
            </dl>

            <p className="mt-3 text-xs text-muted-foreground">
              Ride Sync only helps divide eligible travel costs (fuel + tolls) — it is cost sharing,
              not a commercial fare.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Button variant="outline" onClick={() => setStage("details")}>
                Back
              </Button>
              <Button
                variant="hero"
                onClick={() => {
                  toast.success(
                    `Seat requested with ${driver.name}. Your share ₹${perHead} — pay after confirmation.`,
                  );
                  onClose();
                }}
              >
                Confirm & request <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}
        {driver && stage === "details" && (
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-3xl bg-gradient-primary font-display text-xl font-bold text-primary-foreground shadow-glow">
                {initials(driver.name)}
              </span>
              <div>
                <DialogTitle className="text-xl">{driver.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-1">
                  <Star className="size-3.5 fill-gold text-gold" /> {driver.rating} ·{" "}
                  {driver.reviews} rides · {driver.gender}
                </DialogDescription>
              </div>
            </div>

            <dl className="mt-5 grid gap-2 text-sm">
              {[
                ["Vehicle", `${driver.vehicle} · ${driver.model}`],
                ["Number plate", driver.plate],
                ["Licence", driver.license],
                ["Fuel", driver.fuel],
                ["Route", `${driver.from} → ${driver.to}`],
                ["Departure", driver.time],
                ["Shared fare", `₹${driver.fare} / seat`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-xl bg-secondary/60 px-3.5 py-2"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold tracking-wider uppercase">
              {["Identity verified", "Licence verified", "Vehicle verified"].map((t) => (
                <span key={t} className="rounded-full bg-primary/12 px-2.5 py-1 text-primary">
                  ✓ {t}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={() => toast(`Masked call placed to ${driver.phone}`)}
              >
                <Phone className="size-4" /> Call driver
              </Button>
              <Button
                variant="hero"
                onClick={() => {
                  toast.success(`Seat requested with ${driver.name}. Awaiting confirmation.`);
                  onClose();
                }}
              >
                Request seat <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
