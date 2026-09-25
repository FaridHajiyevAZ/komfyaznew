"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/b2b";

const SLIDE_BG = [
  "radial-gradient(60% 60% at 80% 15%, rgba(163,121,100,.55), rgba(163,121,100,0) 70%), linear-gradient(135deg,#2b2620,#1a1712)",
  "linear-gradient(120deg,#3a2f27,#211b16)",
  "radial-gradient(70% 70% at 20% 20%, rgba(163,121,100,.4), rgba(163,121,100,0) 70%), linear-gradient(135deg,#2b2620,#171310)",
];

export function HeroCarousel() {
  const [slide, setSlide] = useState(0);
  const paused = useRef(false);
  const n = heroSlides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) setSlide((s) => (s + 1) % n);
    }, 6000);
    return () => clearInterval(timer);
  }, [n]);

  return (
    <section
      className="relative h-[min(78vh,640px)] min-h-[440px] overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === slide ? 1 : 0,
            pointerEvents: i === slide ? "auto" : "none",
            zIndex: i === slide ? 1 : 0,
          }}
        >
          <div className="absolute inset-0" style={{ background: SLIDE_BG[i % SLIDE_BG.length] }} />
          <span className="absolute right-4 top-4 z-[2] rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-medium text-white/60">
            {s.imageLabel}
          </span>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg,rgba(20,17,13,.78) 0%,rgba(20,17,13,.5) 42%,rgba(20,17,13,.08) 72%)",
            }}
          />
          <div className="absolute inset-0 flex max-w-[640px] flex-col justify-center px-[clamp(24px,9vw,110px)] text-white">
            <span className="w-fit rounded-full border border-white/35 bg-white/[.14] px-3.5 py-1.5 text-[12.5px] font-bold backdrop-blur-sm">
              {s.badge}
            </span>
            <h1 className="mb-3.5 mt-5 font-grotesk text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.14] tracking-[-0.01em]">
              {s.title}
            </h1>
            <p className="mb-6 max-w-[460px] text-[16px] leading-[1.6] text-white/[.88]">
              {s.text}
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href={s.primary.href}
                className="rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-white/90"
              >
                {s.primary.label}
              </Link>
              <Link
                href={s.secondary.href}
                className="rounded-[10px] border-[1.5px] border-white/70 bg-white/10 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/20"
              >
                {s.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setSlide((s) => (s + n - 1) % n)}
        aria-label="Əvvəlki"
        className="absolute left-5 top-1/2 z-[5] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/35 text-lg text-white hover:bg-black/50"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => setSlide((s) => (s + 1) % n)}
        aria-label="Növbəti"
        className="absolute right-5 top-1/2 z-[5] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/35 text-lg text-white hover:bg-black/50"
      >
        →
      </button>

      <div className="absolute bottom-6 left-1/2 z-[5] flex -translate-x-1/2 gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Slayd ${i + 1}`}
            className="h-[9px] rounded-full transition-all"
            style={{
              width: i === slide ? 22 : 9,
              background: i === slide ? "#fff" : "rgba(255,255,255,.45)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
