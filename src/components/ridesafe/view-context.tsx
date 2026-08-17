import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const VIEWS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "rides", label: "Rides" },
  { id: "tracking", label: "Tracking" },
  { id: "verification", label: "Drivers" },
  { id: "fare", label: "Fare" },
  { id: "safety", label: "Safety" },
  { id: "how", label: "How it works" },
  { id: "impact", label: "Impact" },
] as const;

export type ViewId = (typeof VIEWS)[number]["id"];

const VIEW_EVENT = "ridesync:view";

/** Switch the single visible section from anywhere in the app. */
export function goToView(id: ViewId | string) {
  window.dispatchEvent(new CustomEvent(VIEW_EVENT, { detail: id }));
}

type ViewCtx = { view: ViewId; setView: (v: ViewId) => void };
const Ctx = createContext<ViewCtx | null>(null);

export function useView() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useView must be used inside ViewProvider");
  return ctx;
}

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<ViewId>("home");

  const setView = (v: ViewId) => {
    setViewState(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (VIEWS.some((v) => v.id === id)) setView(id as ViewId);
    };
    window.addEventListener(VIEW_EVENT, handler);
    return () => window.removeEventListener(VIEW_EVENT, handler);
  }, []);

  const value = useMemo(() => ({ view, setView }), [view]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
