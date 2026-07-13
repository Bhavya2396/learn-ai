"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Brain, Infinity as InfinityIcon,
  Search, Map, GraduationCap, RefreshCw,
} from "lucide-react";
import Nav from "./Nav";
import LivingBackground from "./LivingBackground";
import ZoeOrb from "./ZoeOrb";
import { AreaIcon, type AreaKey } from "./illustrations";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }} className={className}>
      {children}
    </motion.div>
  );
}


export default function Landing() {
  return (
    <div className="zoe zoe-warm relative min-h-full">
      <LivingBackground />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Stats />
        <HowSection />
        <HatsSection />
        <AspirationsSection />
        <WhySection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="z-wrap relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center pt-10 pb-20 md:pt-16 md:pb-28">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="zoe-display text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.02]" style={{ color: "var(--z-ink)" }}>
            Become whoever
            <br />
            <span style={{ color: "var(--z-brand-deep)" }}>you want to be.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mt-6 text-[18px] md:text-[19px] leading-relaxed font-medium max-w-xl" style={{ color: "var(--z-ink-2)" }}>
            A founder, a guitarist, calmer, fitter, financially free — pick one goal or many.
            ZOE builds the path, walks it with you, and adapts as you grow.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/start" className="z-btn z-btn-brand !px-7 !py-4 !text-[16px]">
              Get started <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            <Link href="#how" className="z-btn z-btn-ghost !px-6 !py-4 !text-[16px]">See how it works</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-[13.5px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
            <span className="flex items-center gap-1.5"><Brain className="w-4 h-4" /> Remembers you</span>
            <span className="flex items-center gap-1.5"><InfinityIcon className="w-4 h-4" /> Many aspirations</span>
            <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4" /> Always adapting</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="relative flex items-center justify-center">
          <ZoeOrb size={420} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── STATS ────────────────────────── */
function Stats() {
  const stats = [
    { n: "∞", l: "goals at once" },
    { n: "4", l: "systems, one memory" },
    { n: "24/7", l: "adapting to you" },
    { n: "0", l: "data we sell" },
  ];
  return (
    <section style={{ background: "var(--z-surface)", borderTop: "1px solid var(--z-line)", borderBottom: "1px solid var(--z-line)" }}>
      <div className="z-wrap py-9 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.06} className="text-center">
            <div className="zoe-display text-3xl md:text-4xl" style={{ color: "var(--z-brand-deep)" }}>{s.n}</div>
            <div className="mt-1 text-[13px] font-semibold" style={{ color: "var(--z-ink-3)" }}>{s.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── HOW ──────────────────────────── */
function HowSection() {
  const steps = [
    { n: "01", t: "A real conversation", d: "Not a form. A few questions to understand how you think and what drives you.", c: "#F0A91E", icon: Search },
    { n: "02", t: "A path built for you", d: "Phases, steps, and a map — from where you are to where you want to be.", c: "#7C5CFF", icon: Map },
    { n: "03", t: "Guided, your way", d: "Every step delivered the way that fits you — visual, hands-on, concise.", c: "#FF6B5B", icon: GraduationCap },
    { n: "04", t: "Keeps adapting", d: "Learns from every step and adjusts. Add a new goal anytime.", c: "#15C2A5", icon: RefreshCw },
  ];
  return (
    <section id="how" className="z-wrap py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <span className="z-eyebrow">How it works</span>
          <h2 className="mt-2 zoe-display text-[clamp(2rem,4vw,3.2rem)]" style={{ color: "var(--z-ink)" }}>
            How it works
          </h2>
          <p className="mt-4 text-[17px] font-medium" style={{ color: "var(--z-ink-2)" }}>
            Four steps. One goal or many.
          </p>
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={(i % 4) * 0.07}>
            <div className="z-card z-card-hover h-full p-6">
              <div className="flex items-center justify-between">
                <span className="zoe-display text-2xl" style={{ color: s.c }}>{s.n}</span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${s.c}1c` }}>
                  <s.icon className="w-6 h-6" style={{ color: s.c }} />
                </div>
              </div>
              <h3 className="mt-4 text-[18px] font-extrabold" style={{ color: "var(--z-ink)" }}>{s.t}</h3>
              <p className="mt-1.5 text-[14px] font-medium leading-relaxed" style={{ color: "var(--z-ink-2)" }}>{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── HATS ─────────────────────────── */
function HatsSection() {
  const hats = [
    { t: "Profiler", d: "Understands your level, your drive, and how you think.", icon: Brain, c: "#F0A91E" },
    { t: "Architect", d: "Builds a path with phases, steps, and dependencies.", icon: Map, c: "#7C5CFF" },
    { t: "Mentor", d: "Delivers each step — diagrams, code, quizzes — tuned to you.", icon: GraduationCap, c: "#FF6B5B" },
    { t: "Optimizer", d: "Tracks your performance and restructures the path when needed.", icon: RefreshCw, c: "#15C2A5" },
  ];
  return (
    <section id="hats" style={{ background: "var(--z-surface-2)" }}>
      <div className="z-wrap py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <span className="z-eyebrow">Inside ZOE</span>
          <h2 className="mt-2 zoe-display text-[clamp(2rem,4vw,3.2rem)]" style={{ color: "var(--z-ink)" }}>
            What&apos;s under the hood
          </h2>
          <p className="mt-4 text-[17px] font-medium" style={{ color: "var(--z-ink-2)" }}>
            Four systems sharing one memory of you.
          </p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hats.map((h, i) => (
            <Reveal key={h.t} delay={(i % 4) * 0.07}>
              <div className="z-card z-card-hover h-full p-6 text-center">
                <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: `${h.c}1c` }}>
                  <h.icon className="w-9 h-9" style={{ color: h.c }} />
                </div>
                <h3 className="text-[18px] font-extrabold" style={{ color: "var(--z-ink)" }}>{h.t}</h3>
                <p className="mt-1.5 text-[14px] font-medium leading-relaxed" style={{ color: "var(--z-ink-2)" }}>{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ASPIRATIONS ──────────────────────── */
function AspirationsSection() {
  const items: { t: string; c: string; area: AreaKey }[] = [
    { t: "Become a founder", c: "#FF6B5B", area: "entrepreneurship" },
    { t: "Learn fingerstyle guitar", c: "#7C5CFF", area: "craft" },
    { t: "Get fit and energised", c: "#5BB98C", area: "health" },
    { t: "Become financially free", c: "#15C2A5", area: "money" },
    { t: "Speak with confidence", c: "#2E9BFF", area: "mindset" },
    { t: "Find calm and focus", c: "#F0A91E", area: "knowledge" },
  ];
  return (
    <section className="z-wrap py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <span className="z-eyebrow">Anything you want</span>
          <h2 className="mt-2 zoe-display text-[clamp(2rem,4vw,3.2rem)]" style={{ color: "var(--z-ink)" }}>
            One goal or many.
          </h2>
          <p className="mt-4 text-[17px] font-medium" style={{ color: "var(--z-ink-2)" }}>
            Career, craft, health, money, mindset — each gets its own path.
          </p>
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((c, i) => (
          <Reveal key={c.t} delay={(i % 3) * 0.07}>
            <Link href="/start" className="z-card z-card-hover block h-full overflow-hidden">
              <div className="relative h-32 flex items-center justify-center" style={{ background: `${c.c}14` }}>
                <span className="w-20 h-20 rounded-3xl grid place-items-center" style={{ background: `${c.c}22` }}>
                  <AreaIcon area={c.area} size={40} color={c.c} />
                </span>
              </div>
              <div className="p-5 flex items-center justify-between" style={{ borderTop: "1px solid var(--z-line)" }}>
                <h3 className="text-[17px] font-extrabold" style={{ color: "var(--z-ink)" }}>{c.t}</h3>
                <ArrowRight className="w-4.5 h-4.5" style={{ color: c.c }} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── WHY ──────────────────────────── */
function WhySection() {
  return (
    <section id="why" style={{ background: "var(--z-surface-2)" }}>
      <div className="z-wrap py-20 md:py-28 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
        <Reveal>
          <span className="z-eyebrow">Persistent memory</span>
          <h2 className="mt-2 zoe-display text-[clamp(2rem,4vw,3.2rem)]" style={{ color: "var(--z-ink)" }}>
            Picks up where you left off.
          </h2>
          <p className="mt-4 text-[17px] font-medium leading-relaxed" style={{ color: "var(--z-ink-2)" }}>
            What you mastered, what tripped you up, where you&apos;re headed — remembered across every
            session and every goal. Your data, fully yours.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {["Remembers context", "Tracks progress", "Adapts teaching style", "Works offline"].map((e) => (
              <span key={e} className="z-chip" style={{ background: "var(--z-surface)", border: "1px solid var(--z-line-2)", color: "var(--z-ink-2)" }}>{e}</span>
            ))}
          </div>
          <Link href="/start" className="z-btn z-btn-brand mt-8 !px-7 !py-4 !text-[16px]">Get started <ArrowRight className="w-4.5 h-4.5" /></Link>
        </Reveal>
        <Reveal delay={0.12} className="relative">
          <div className="z-card p-8">
            <div className="flex items-center gap-3">
              <ZoeOrb size={44} />
              <div>
                <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "var(--z-ink-3)" }}>Memory</div>
                <div className="text-[15px] font-extrabold" style={{ color: "var(--z-ink)" }}>Context from every session</div>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                { c: "#F0A91E", t: "Margins tripped you up last week — revisiting today." },
                { c: "#7C5CFF", t: "Worked examples → 90% accuracy. Serving more of those." },
                { c: "#15C2A5", t: "5-day streak. Evenings are your strongest window." },
              ].map((m) => (
                <div key={m.t} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: "var(--z-surface-2)" }}>
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: m.c }} />
                  <span className="text-[14px] font-semibold" style={{ color: "var(--z-ink)" }}>{m.t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CTA ──────────────────────────── */
function CtaSection() {
  return (
    <section className="z-wrap py-20 md:py-28">
      <Reveal>
        <div className="rounded-[28px] p-10 md:p-16 text-center" style={{ background: "var(--z-ink)" }}>
          <ZoeOrb size={140} className="mx-auto mb-4" />
          <h2 className="zoe-display text-[clamp(2.2rem,5vw,3.6rem)]" style={{ color: "#FBF8F2" }}>
            Who do you want to become?
          </h2>
          <p className="mt-4 text-[18px] font-medium max-w-xl mx-auto" style={{ color: "#C9C1B4" }}>
            Two minutes to a path that&apos;s actually yours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start" className="z-btn z-btn-brand !px-8 !py-4 !text-[16px]">Start free <ArrowRight className="w-4.5 h-4.5" /></Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────── FOOTER ───────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "var(--z-surface)", borderTop: "1px solid var(--z-line)" }}>
      <div className="z-wrap py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <ZoeOrb size={30} />
          <span className="text-[16px] font-extrabold" style={{ color: "var(--z-ink)" }}>ZOE</span>
        </div>
        <p className="text-[13.5px] font-semibold" style={{ color: "var(--z-ink-3)" }}>
          © 2026 ZOE
        </p>
        <div className="flex items-center gap-5 text-[13.5px] font-semibold" style={{ color: "var(--z-ink-2)" }}>
          <Link href="/start">Get started</Link>
          <Link href="/home">My ZOE</Link>
        </div>
      </div>
    </footer>
  );
}
