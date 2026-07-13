"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ZoeOrb from "./ZoeOrb";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The hats", href: "#hats" },
  { label: "Why ZOE", href: "#why" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.querySelector(".zoe-root");
    const target: HTMLElement | Window = root instanceof HTMLElement ? root : window;
    const onScroll = () => {
      const y = root instanceof HTMLElement ? root.scrollTop : window.scrollY;
      setScrolled(y > 16);
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(251,248,242,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--z-line)" : "1px solid transparent",
      }}
    >
      <nav className="z-wrap flex items-center justify-between" style={{ height: 72 }}>
        <Link href="/" className="flex items-center gap-2.5">
          <ZoeOrb size={34} />
          <span className="text-[19px] font-extrabold tracking-tight" style={{ color: "var(--z-ink)" }}>
            ZOE<span style={{ color: "var(--z-brand-deep)" }}> ONE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-4 py-2 rounded-full text-[14.5px] font-semibold transition-colors"
              style={{ color: "var(--z-ink-2)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/start" className="hidden sm:inline-flex text-[14.5px] font-bold px-3 py-2" style={{ color: "var(--z-ink-2)" }}>
            Log in
          </Link>
          <Link href="/start" className="z-btn z-btn-brand !py-2.5 !px-5 !text-[14px]">
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
