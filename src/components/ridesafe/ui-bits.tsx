import { motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const up: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={up}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase backdrop-blur",
        className,
      )}
    >
      <i className="size-1.5 animate-blink rounded-full bg-gradient-primary" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  copy,
  center = true,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl leading-[1.08] font-semibold sm:text-4xl md:text-5xl">
        {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </h2>
      {copy ? <p className="mt-4 text-base text-muted-foreground">{copy}</p> : null}
    </Reveal>
  );
}

/** Glossy surface with sheen highlight + hover lift. */
export function GlossCard({
  children,
  className,
  sheen = false,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  sheen?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "glossy lift rounded-3xl border border-border/70 bg-card/80 shadow-soft backdrop-blur",
        hover && "hover:lift-hover hover:border-primary/30",
        className,
      )}
    >
      <span className="gloss-layer rounded-3xl" aria-hidden />
      {sheen ? <span className="sheen-sweep" aria-hidden /> : null}
      <div className="relative">{children}</div>
    </div>
  );
}

export function Counter({
  to,
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
