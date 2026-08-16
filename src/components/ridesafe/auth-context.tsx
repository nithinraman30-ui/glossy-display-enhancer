import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AuthDialog } from "./AuthDialog";

type AuthCtx = {
  open: (opts?: { women?: boolean; guardian?: boolean }) => void;
  signedIn: boolean;
  name: string;
  womenMode: boolean;
  setWomenMode: (v: boolean) => void;
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

  const value = useMemo(
    () => ({ open, signedIn, name, womenMode, setWomenMode }),
    [open, signedIn, name, womenMode],
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
        }}
      />
    </Ctx.Provider>
  );
}
