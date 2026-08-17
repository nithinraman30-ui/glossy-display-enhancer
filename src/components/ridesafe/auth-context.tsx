import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AuthDialog } from "./AuthDialog";
import { goToView } from "./view-context";

type AuthCtx = {
  open: (opts?: { women?: boolean; guardian?: boolean }) => void;
  signedIn: boolean;
  name: string;
  womenMode: boolean;
  setWomenMode: (v: boolean) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState({ women: false, guardian: false });
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState("Rider");
  const [womenMode, setWomenMode] = useState(false);

  const open = useCallback((opts?: { women?: boolean; guardian?: boolean }) => {
    setPrefs({ women: Boolean(opts?.women), guardian: Boolean(opts?.guardian) });
    setIsOpen(true);
  }, []);

  const signOut = useCallback(() => {
    setSignedIn(false);
    setWomenMode(false);
    goToView("home");
    toast("Signed out of Ride Sync.");
  }, []);

  const value = useMemo(
    () => ({ open, signedIn, name, womenMode, setWomenMode, signOut }),
    [open, signedIn, name, womenMode, signOut],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <AuthDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        initialPrefs={prefs}
        onSuccess={(userName, women) => {
          setSignedIn(true);
          setName(userName || "Rider");
          if (women) setWomenMode(true);
          goToView("services");
        }}
      />
    </Ctx.Provider>
  );
}
