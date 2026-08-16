import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-context";

const LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "rides", label: "Rides" },
  { id: "tracking", label: "Tracking" },
  { id: "verification", label: "Drivers" },
  { id: "safety", label: "Safety" },
  { id: "how", label: "How it works" },
];

export function Nav() {
  const { open, signedIn, name } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["home", ...LINKS.map((l) => l.id)];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMobile(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-elegant" : "border border-transparent",
        )}
        style={{ width: "min(100% - 1.5rem, 72rem)" }}
      >
        <button
          onClick={() => goTo("home")}
          className="group flex items-center gap-2.5"
          aria-label="RideSafe home"
        >
          <span className="glossy relative flex size-10 items-center justify-center rounded-2xl bg-gradient-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
            <span className="gloss-layer rounded-2xl" aria-hidden />
            R
          </span>
          <span className="font-display text-lg font-semibold">
            Ride<span className="text-gradient">Safe</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                active === l.id && "text-foreground",
              )}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ink" className="hidden sm:inline-flex" onClick={() => open()}>
            {signedIn ? `Hi, ${name.split(" ")[0]}` : "Login / Sign up"}
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobile && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 grid gap-1 rounded-3xl p-3 glass shadow-elegant lg:hidden"
          style={{ width: "min(100% - 1.5rem, 72rem)" }}
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="rounded-2xl px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary"
            >
              {l.label}
            </button>
          ))}
          <Button variant="hero" className="mt-1" onClick={() => open()}>
            Login / Sign up
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
