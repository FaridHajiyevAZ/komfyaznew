"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { b2bNav } from "@/data/b2b";

export function B2bHeader() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"AZ" | "EN">("AZ");
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-b2b-line/50 bg-b2b-bg/95 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/brand/komfy-logo.png"
            alt="KOMFY"
            width={130}
            height={31}
            className="h-[26px] w-auto"
            style={{ width: "auto" }}
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-6 text-[13.5px] font-medium lg:flex xl:gap-7">
          {b2bNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-b2b-ink ${
                isActive(item.href) ? "text-b2b-ink" : "text-b2b-text2"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="flex overflow-hidden rounded-lg text-[12px] font-bold shadow-[0_2px_8px_rgba(33,30,27,0.07)]">
            <button
              type="button"
              onClick={() => setLang("AZ")}
              className={`px-2.5 py-[5px] transition-colors ${
                lang === "AZ" ? "bg-b2b-ink text-white" : "bg-white text-b2b-muted2"
              }`}
            >
              AZ
            </button>
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`px-2.5 py-[5px] transition-colors ${
                lang === "EN" ? "bg-b2b-ink text-white" : "bg-white text-b2b-muted2"
              }`}
            >
              EN
            </button>
          </div>
          <Link
            href="/quote"
            className="hidden whitespace-nowrap rounded-lg bg-b2b-ink px-4 py-[9px] text-[13px] font-bold text-white transition-colors hover:bg-b2b-ink2 sm:inline-block"
          >
            Request a Quote
          </Link>
          <button
            type="button"
            className="text-2xl leading-none text-b2b-ink lg:hidden"
            aria-label="Menyu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-b2b-line/60 bg-b2b-bg lg:hidden">
          <nav className="flex flex-col px-5 py-3 sm:px-8">
            {b2bNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] font-medium text-b2b-text2 hover:bg-b2b-band"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-b2b-ink px-4 py-3 text-center text-[14px] font-bold text-white"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
