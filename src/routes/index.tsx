import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/components/ridesafe/auth-context";
import { ViewProvider, useView, VIEWS } from "@/components/ridesafe/view-context";
import { Nav } from "@/components/ridesafe/Nav";
import { Hero } from "@/components/ridesafe/Hero";
import { Pillars } from "@/components/ridesafe/Pillars";
import { About } from "@/components/ridesafe/About";
import { Services } from "@/components/ridesafe/Services";
import { RideMarket } from "@/components/ridesafe/RideMarket";
import { Tracking } from "@/components/ridesafe/Tracking";
import { Verification } from "@/components/ridesafe/Verification";
import { Fare } from "@/components/ridesafe/Fare";
import { Safety } from "@/components/ridesafe/Safety";
import { HowItWorks } from "@/components/ridesafe/HowItWorks";
import { Impact } from "@/components/ridesafe/Impact";
import { Footer } from "@/components/ridesafe/Footer";

const title = "Ride Sync — Safe, Low-Fare Ride & Goods Sharing";
const description =
  "Ride Sync connects verified drivers and passengers for low-fare shared rides and goods delivery, with split ride expenses, live tracking, guardian sharing and one-tap SOS.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ViewProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Nav />
          <main>
            <Shell />
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </div>
      </AuthProvider>
    </ViewProvider>
  );
}

const SECTIONS: Record<string, () => ReactNode> = {
  about: About,
  services: Services,
  rides: RideMarket,
  tracking: Tracking,
  verification: Verification,
  fare: Fare,
  safety: Safety,
  how: HowItWorks,
  impact: Impact,
};

function Shell() {
  const { signedIn } = useAuth();
  const { view } = useView();

  if (!signedIn) {
    return (
      <>
        <Hero />
        <Pillars />
        <LoginGate />
      </>
    );
  }

  if (view === "home") {
    return (
      <>
        <Hero />
        <Pillars />
      </>
    );
  }

  const Section = SECTIONS[view] ?? About;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
        className="pt-24"
      >
        <Section />
      </motion.div>
    </AnimatePresence>
  );
}

function LoginGate() {
  const { open } = useAuth();
  const { setView } = useView();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glossy rounded-[2rem] border border-primary/20 bg-card/85 p-8 shadow-elegant backdrop-blur-xl md:p-12"
        >
          <span className="gloss-layer rounded-[2rem]" aria-hidden />
          <span className="sheen-sweep rounded-[2rem]" aria-hidden />
          <div className="relative">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Lock className="size-6" />
            </span>
            <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
              Sign in to unlock <span className="text-gradient">Ride Sync</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Services, the live ride marketplace, tracking, verified drivers, fare splitting and
              the safety centre open up right after login or sign up.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {VIEWS.filter((v) => v.id !== "home").map((v, i) => (
                <motion.button
                  key={v.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => {
                    setView(v.id);
                    open();
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/60 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Lock className="size-3" /> {v.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="hero" size="lg" onClick={() => open()}>
                Login / Sign up <Sparkles className="size-4" />
              </Button>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" /> OTP verified · demo code 1234
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
