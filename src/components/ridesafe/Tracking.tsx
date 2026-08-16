import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Lock, ShieldCheck, Satellite, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GlossCard, Reveal, SectionHeading } from "./ui-bits";

const ROUTE = "M40 220 C 120 220 130 150 200 140 S 300 70 360 52";

export function Tracking() {
  const [satellite, setSatellite] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [guardian, setGuardian] = useState({ name: "", phone: "" });
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [eta, setEta] = useState(18);

  useEffect(() => {
    const id = setInterval(() => setEta((e) => (e <= 1 ? 18 : e - 1)), 4000);
    return () => clearInterval(id);
  }, []);

  const confirm = () => {
    if (!guardian.name.trim() || guardian.phone.replace(/\D/g, "").length < 10) {
      toast.error("Enter guardian name and a valid 10-digit phone.");
      return;
    }
    setConfirmed(guardian.name.trim());
    toast.success(`Secure live tracking link shared with ${guardian.name.trim()}.`);
  };

  return (
    <section id="tracking" className="relative bg-surface/70 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Map & live tracking"
          title="See the route."
          highlight="Share the journey."
          copy="Pickup and drop are plotted on a live route preview. Guardian sharing stays off until the passenger explicitly confirms it."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <GlossCard className="overflow-hidden p-0" hover={false}>
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
                <b className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase">
                  <span className="size-1.5 animate-blink rounded-full bg-destructive" /> Live
                  tracking preview
                </b>
                <Button variant="outline" size="sm" onClick={() => setSatellite((v) => !v)}>
                  {satellite ? <Satellite className="size-4" /> : <MapIcon className="size-4" />}
                  {satellite ? "Satellite" : "Road"}
                </Button>
              </div>

              <div
                className={
                  "relative h-72 overflow-hidden sm:h-80 " + (satellite ? "bg-ink" : "bg-surface-2")
                }
              >
                <div
                  className={"absolute inset-0 " + (satellite ? "noise opacity-40" : "grid-lines opacity-70")}
                  aria-hidden
                />
                <svg viewBox="0 0 400 260" className="absolute inset-0 size-full">
                  <g
                    stroke={satellite ? "oklch(1 0 0 / 0.13)" : "oklch(0.2 0.03 130 / 0.12)"}
                    strokeWidth="12"
                    fill="none"
                  >
                    <path d="M-10 90 H410" />
                    <path d="M-10 190 H410" />
                    <path d="M120 -10 V270" />
                    <path d="M290 -10 V270" />
                  </g>
                  <ellipse
                    cx="330"
                    cy="215"
                    rx="90"
                    ry="45"
                    fill={satellite ? "oklch(0.4 0.09 235 / 0.5)" : "oklch(0.72 0.09 235 / 0.35)"}
                  />
                  <path
                    d={ROUTE}
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d={ROUTE}
                    fill="none"
                    stroke="oklch(1 0 0 / 0.55)"
                    strokeWidth="2"
                    strokeDasharray="6 10"
                    className="animate-dash"
                  />
                  <circle cx="40" cy="220" r="10" fill="var(--color-primary-glow)" />
                  <circle cx="360" cy="52" r="10" fill="var(--color-accent-glow)" />
                </svg>

                <motion.span
                  className="absolute top-0 left-0 text-2xl drop-shadow"
                  style={{ offsetPath: `path("${ROUTE}")` }}
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  🚗
                </motion.span>

                <span className="absolute bottom-4 left-4 rounded-full bg-card/85 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  A · Pickup
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-card/85 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  B · Drop
                </span>
                <span className="absolute right-4 bottom-4 rounded-full bg-gradient-gold px-3 py-1.5 text-xs font-bold text-gold-foreground">
                  ETA {eta} min
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <span className="grid">
                  <small className="text-[10px] tracking-widest text-muted-foreground">PICKUP</small>
                  <b>Tambaram, Chennai</b>
                </span>
                <span className="text-primary">→</span>
                <span className="grid text-right">
                  <small className="text-[10px] tracking-widest text-muted-foreground">DROP</small>
                  <b>Guindy, Chennai</b>
                </span>
              </div>
            </GlossCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlossCard className="h-full p-6" hover={false}>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <ShieldCheck className="size-5" />
                </span>
                <span className="grid flex-1">
                  <b>Guardian live sharing</b>
                  <small className="text-xs text-muted-foreground">Private and user controlled</small>
                </span>
                <Lock className="size-4 text-muted-foreground" />
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3">
                  <span className="grid gap-1">
                    <i className="size-2.5 rounded-full bg-primary" />
                    <i className="mx-auto h-6 w-px bg-border" />
                    <i className="size-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="grid gap-3 text-sm">
                    <span className="grid">
                      <small className="text-[10px] tracking-widest text-muted-foreground">
                        PICKUP
                      </small>
                      <b>Tambaram</b>
                    </span>
                    <span className="grid">
                      <small className="text-[10px] tracking-widest text-muted-foreground">
                        DESTINATION
                      </small>
                      <b>Guindy</b>
                    </span>
                  </span>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/60 px-4 py-3">
                  <Switch
                    checked={sharing}
                    onCheckedChange={(v) => {
                      setSharing(v);
                      if (!v) setConfirmed(null);
                    }}
                    aria-label="Share live tracking"
                  />
                  <span className="grid">
                    <b className="text-sm">Share live tracking</b>
                    <small className="text-xs text-muted-foreground">
                      Ask parents / guardian before sharing
                    </small>
                  </span>
                </label>

                {sharing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid gap-2 overflow-hidden"
                  >
                    <Input
                      placeholder="Guardian name"
                      value={guardian.name}
                      onChange={(e) => setGuardian({ ...guardian, name: e.target.value })}
                    />
                    <Input
                      placeholder="Guardian phone"
                      inputMode="numeric"
                      value={guardian.phone}
                      onChange={(e) =>
                        setGuardian({
                          ...guardian,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                    />
                    <Button variant="hero" onClick={confirm}>
                      Confirm secure sharing
                    </Button>
                  </motion.div>
                )}

                <div
                  className={
                    "rounded-2xl px-4 py-3 text-sm transition-colors " +
                    (confirmed
                      ? "bg-primary/12 text-primary"
                      : "bg-secondary/60 text-muted-foreground")
                  }
                >
                  <b className="flex items-center gap-2">
                    <span
                      className={
                        "size-2 rounded-full " +
                        (confirmed ? "animate-blink bg-primary" : "bg-muted-foreground")
                      }
                    />
                    {confirmed ? `Live tracking shared with ${confirmed}` : "Not shared"}
                  </b>
                  <small className="mt-1 block">
                    {confirmed
                      ? "Guardian can follow your trip until you arrive."
                      : "Your location stays private until you confirm."}
                  </small>
                </div>
              </div>
            </GlossCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
