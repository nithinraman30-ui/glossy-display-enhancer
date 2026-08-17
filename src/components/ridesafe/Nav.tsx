import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-context";
import { VIEWS, useView } from "./view-context";

const LINKS = VIEWS.filter((v) => v.id !== "home");

export function Nav() {
  const { open, signedIn, name, signOut } = useAuth();
  const { view, setView } = useView();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMobile(false);
    setView(id as never);
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
          aria-label="Ride Sync home"
        >
          <span className="glossy relative flex size-10 items-center justify-center rounded-2xl bg-gradient-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
            <span className="gloss-layer rounded-2xl" aria-hidden />
            R
          </span>
          <span className="font-display text-lg font-semibold">
            Ride <span className="text-gradient">Sync</span>
          </span>
        </button>

        {signedIn && (
          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  view === l.id && "text-foreground",
                )}
              >
                {view === l.id && (
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
        )}

        <div className="flex items-center gap-2">
          {signedIn ? (
            <Button variant="ink" className="hidden sm:inline-flex" onClick={signOut}>
              <LogOut className="size-4" /> {name.split(" ")[0]} · Sign out
            </Button>
          ) : (
            <Button variant="ink" className="hidden sm:inline-flex" onClick={() => open()}>
              Login / Sign up
            </Button>
          )}
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
          className="glass mx-auto mt-2 grid gap-1 rounded-3xl p-3 shadow-elegant lg:hidden"
          style={{ width: "min(100% - 1.5rem, 72rem)" }}
        >
          {signedIn &&
            LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                className="rounded-2xl px-4 py-2.5 text-left text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </button>
            ))}
          {signedIn ? (
            <Button
              variant="hero"
              className="mt-1"
              onClick={() => {
                setMobile(false);
                signOut();
              }}
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          ) : (
            <Button variant="hero" className="mt-1" onClick={() => open()}>
              Login / Sign up
            </Button>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
