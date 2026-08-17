import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui-bits";
import { goToView } from "./view-context";

const COLS = [
  {
    title: "Platform",
    links: ["Get Ride Sync", "Share your seat", "Delivery partners", "Fare estimator"],
    ids: ["rides", "rides", "services", "fare"],
  },
  {
    title: "Trust & safety",
    links: ["Driver verification", "Live tracking", "Guardian sharing", "Emergency SOS"],
    ids: ["verification", "tracking", "tracking", "safety"],
  },
  {
    title: "Project",
    links: ["About Ride Sync", "How it works", "Impact", "Agile roadmap"],
    ids: ["about", "how", "impact", "how"],
  },
];

export function Footer() {
  const go = (id: string) =>
    goToView(id);

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border/60 bg-surface/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-gradient-primary text-lg text-primary-foreground shadow-glow">
              🛡️
            </span>
            <b className="font-display text-xl">
              Ride <span className="text-gradient">Sync</span>
            </b>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A safe, low-fare ride and goods sharing platform built around verification, live
            tracking and transparent shared fares.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> hello@ridesafe.project
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +91 90000 00000
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Chennai, Tamil Nadu
            </li>
          </ul>
        </Reveal>

        {COLS.map((c, i) => (
          <Reveal key={c.title} delay={0.06 * (i + 1)}>
            <b className="text-[11px] font-bold tracking-[0.18em] uppercase">{c.title}</b>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {c.links.map((l, j) => (
                <li key={l}>
                  <button
                    onClick={() => go(c.ids[j]!)}
                    className="story-link text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="border-t border-border/60 px-6 py-5">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ride Sync · Academic project demo. Fares, drivers and tracking
          data shown here are simulated.
        </p>
      </div>
    </footer>
  );
}
