import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/ridesafe/auth-context";
import { AuthDialog } from "@/components/ridesafe/AuthDialog";
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

const title = "RideSafe — Safe, Low-Fare Ride & Goods Sharing";
const description =
  "RideSafe connects verified drivers and passengers for low-fare shared rides and goods delivery, with live tracking, guardian sharing and one-tap SOS.";

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
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <Pillars />
          <About />
          <Services />
          <RideMarket />
          <Tracking />
          <Verification />
          <Fare />
          <Safety />
          <HowItWorks />
          <Impact />
        </main>
        <Footer />
        <AuthDialog />
        <Toaster position="top-center" richColors />
      </div>
    </AuthProvider>
  );
}
