import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Check, Lock, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Step = "phone" | "otp" | "done";

export function AuthDialog({
  open,
  onOpenChange,
  initialPrefs,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialPrefs: { women: boolean; guardian: boolean };
  onSuccess: (name: string, women: boolean) => void;
}) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [women, setWomen] = useState(initialPrefs.women);
  const [guardian, setGuardian] = useState(initialPrefs.guardian);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const boxes = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (open) {
      setStep("phone");
      setOtp(["", "", "", ""]);
      setWomen(initialPrefs.women);
      setGuardian(initialPrefs.guardian);
    }
  }, [open, initialPrefs]);

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setStep("otp");
    toast.success("Demo OTP sent: 1234");
    setTimeout(() => boxes.current[0]?.focus(), 120);
  };

  const verify = () => {
    if (otp.join("") !== "1234") {
      toast.error("Incorrect OTP. Use the demo code 1234.");
      return;
    }
    setStep("done");
    onSuccess(name.trim(), women);
    toast.success("Account verified — welcome to RideSafe.");
  };

  const setDigit = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(0, 1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < 3) boxes.current[i + 1]?.focus();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glossy overflow-hidden rounded-3xl border-border/70 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <span className="gloss-layer" aria-hidden />
        <div className="relative">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-primary font-display text-2xl font-bold text-primary-foreground shadow-glow">
            R
          </div>
          <AnimatePresence mode="wait">
            {step === "phone" && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28 }}
                className="mt-5"
              >
                <DialogTitle className="text-center text-2xl">Sign in with your phone</DialogTitle>
                <DialogDescription className="mt-2 text-center">
                  One secure account for passenger, driver and delivery journeys.
                </DialogDescription>
                <div className="mt-6 space-y-3">
                  <Input
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
                    <span className="text-sm font-semibold text-muted-foreground">🇮🇳 +91</span>
                    <input
                      className="h-11 w-full bg-transparent text-base tracking-wide outline-none"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    />
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5 text-sm">
                    <Checkbox
                      checked={women}
                      onCheckedChange={(v) => setWomen(Boolean(v))}
                      aria-label="Prefer verified women drivers"
                    />
                    Prefer verified women drivers
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5 text-sm">
                    <Checkbox
                      checked={guardian}
                      onCheckedChange={(v) => setGuardian(Boolean(v))}
                      aria-label="Enable guardian trip sharing"
                    />
                    Enable guardian trip sharing
                  </label>
                  <Button variant="hero" size="lg" className="w-full" onClick={sendOtp}>
                    Send OTP <ArrowRight className="size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    <Lock className="mr-1 inline size-3" /> Demo prototype — no real SMS is sent.
                  </p>
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28 }}
                className="mt-5"
              >
                <DialogTitle className="text-center text-2xl">Enter your OTP</DialogTitle>
                <DialogDescription className="mt-2 text-center">
                  Sent to +91 {phone}. Demo code is <b className="text-foreground">1234</b>.
                </DialogDescription>
                <div className="mt-6 flex justify-center gap-3">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        boxes.current[i] = el;
                      }}
                      aria-label={`OTP digit ${i + 1}`}
                      className="size-14 rounded-2xl border border-input bg-background text-center font-display text-2xl outline-none transition focus:border-accent focus:shadow-glow"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[i] && i > 0) boxes.current[i - 1]?.focus();
                        if (e.key === "Enter") verify();
                      }}
                    />
                  ))}
                </div>
                <Button variant="hero" size="lg" className="mt-6 w-full" onClick={verify}>
                  Verify &amp; continue <ArrowRight className="size-4" />
                </Button>
                <button
                  className="mt-3 w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
                  onClick={() => setStep("phone")}
                >
                  Change number
                </button>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="mt-6 text-center"
              >
                <div className="relative mx-auto size-20">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
                  <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                    <Check className="size-9" />
                  </div>
                </div>
                <DialogTitle className="mt-5 text-2xl">Profile secured!</DialogTitle>
                <DialogDescription className="mt-2">
                  {women ? "Women-for-Women preference is on. " : ""}
                  {guardian ? "Guardian sharing is ready. " : ""}
                  Your RideSafe account is verified.
                </DialogDescription>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
                  <ShieldCheck className="size-4" /> KYC · Licence · Vehicle
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="mt-6 w-full"
                  onClick={() => onOpenChange(false)}
                >
                  Start exploring <ArrowRight className="size-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
