import Link from "next/link";
import type { Metadata } from "next";
import { HeroCarousel } from "@/components/b2b/HeroCarousel";
import { ImageSlot } from "@/components/b2b/ImageSlot";
import {
  stats,
  paths,
  industries,
  retailPreview,
  processSteps,
} from "@/data/b2b";

export const metadata: Metadata = {
  title: "KOMFY — Mattress Manufacturer · OEM & Private Label · B2B Supply",
  description:
    "KOMFY manufactures customizable mattress solutions for brands, retailers, hotels, healthcare facilities, and large-scale commercial projects. Since 2015.",
};

export default function HomePage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <HeroCarousel />

      {/* Stats band */}
      <section className="mt-14 bg-b2b-band px-8 py-9">
        <div className="mx-auto grid max-w-[1320px] gap-6 text-center [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-grotesk text-[30px] font-bold text-b2b-ink">{s.value}</div>
              <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.05em] text-b2b-brown">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Three paths */}
      <section className="mx-auto max-w-[1320px] px-8 pt-14">
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {paths.map((p) => (
            <div key={p.title} className="relative h-[420px] overflow-hidden rounded-[20px]">
              <ImageSlot variant="photo" rounded="rounded-[20px]" className="absolute inset-0 h-full w-full" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(33,30,27,0) 38%,rgba(33,30,27,.88) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-[26px] text-white">
                <div className="mb-1.5 text-[11.5px] uppercase tracking-[0.1em] text-white/85">
                  {p.eyebrow}
                </div>
                <h3 className="mb-2 font-grotesk text-[23px] font-semibold">{p.title}</h3>
                <p className="mb-4 max-w-[300px] text-[13.5px] leading-[1.5] text-white/90">
                  {p.text}
                </p>
                <Link
                  href={p.cta.href}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-white"
                >
                  {p.cta.label} <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it's made */}
      <section className="mx-auto grid max-w-[1320px] items-center gap-12 px-8 pt-20 [grid-template-columns:repeat(auto-fit,minmax(360px,1fr))]">
        <ImageSlot
          label="Spring-unit line or foam-cutting close-up"
          className="h-[420px] w-full"
          rounded="rounded-[20px]"
        />
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-b2b-tan">
            How it&apos;s made
          </span>
          <h2 className="mb-3 mt-3.5 font-grotesk text-[30px] font-bold leading-[1.2]">
            Built in-house, from spring to stitch
          </h2>
          <p className="mb-4 max-w-[440px] text-[15px] leading-[1.6] text-b2b-text2">
            Every mattress moves through spring-unit manufacturing, foam cutting and layering,
            quilting and sewing, assembly, inspection and packaging — all on our own production
            floor.
          </p>
          <p className="mb-5 text-[13.5px] text-b2b-muted">{processSteps.join(" → ")}</p>
          <Link
            href="/manufacturing"
            className="inline-block rounded-[10px] border-[1.5px] border-b2b-ink px-5 py-3 text-[14px] font-bold text-b2b-ink transition hover:bg-b2b-ink hover:text-white"
          >
            See the full Manufacturing page
          </Link>
        </div>
      </section>

      {/* Floor gallery */}
      <section className="mx-auto grid max-w-[1320px] grid-cols-2 gap-3.5 px-8 pt-8 md:grid-cols-4">
        {["Production floor", "Machinery", "Materials", "QC / testing"].map((l) => (
          <ImageSlot key={l} label={l} className="h-[160px] w-full" rounded="rounded-xl" />
        ))}
      </section>

      {/* Quality */}
      <section className="mx-auto grid max-w-[1320px] items-center gap-10 px-8 pt-20 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-b2b-tan">
            Quality &amp; compliance
          </span>
          <h2 className="mb-3 mt-3.5 font-grotesk text-[26px] font-bold leading-[1.25]">
            Every mattress passes raw-material control, in-process checks and final inspection
            before it ships.
          </h2>
          <Link
            href="/quality"
            className="mt-1.5 inline-block rounded-[10px] border-[1.5px] border-b2b-ink px-5 py-3 text-[14px] font-bold text-b2b-ink transition hover:bg-b2b-ink hover:text-white"
          >
            View Quality Standards
          </Link>
        </div>
        <div>
          <div className="flex gap-3">
            {["Certificate", "Test report", "Certificate"].map((l, i) => (
              <ImageSlot
                key={i}
                label={l}
                className="h-[128px] w-[100px]"
                rounded="rounded-[10px]"
              />
            ))}
          </div>
          <p className="mt-3 text-[12.5px] italic text-b2b-muted">
            Certificates &amp; test reports shown once uploaded — none implied without a document
            on file.
          </p>
        </div>
      </section>

      {/* Industries served */}
      <section className="mx-auto max-w-[1320px] px-8 pt-20">
        <h2 className="mb-6 font-grotesk text-[28px] font-bold">Industries served</h2>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {industries.map((ind) => (
            <Link key={ind.name} href="/industries" className="block text-b2b-ink">
              <ImageSlot
                label={`${ind.name} — photo`}
                className="h-[170px] w-full"
                rounded="rounded-[14px]"
              />
              <div className="px-0.5 pt-3">
                <div className="text-[15px] font-bold">{ind.name}</div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-b2b-muted2">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: ind.active ? "#211E1B" : "#A37964" }}
                  />
                  {ind.status}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto mt-[88px] max-w-[840px] px-8 text-center">
        <p className="mb-4 font-grotesk text-[24px] leading-[1.45] text-b2b-ink">
          &ldquo;[Hotel chain], 120 rooms — custom firmness spec, non-flip design, delivered in
          phases across the full property.&rdquo;
        </p>
        <p className="text-[13.5px] italic text-b2b-muted">
          Verified client quote — placeholder pending approval
        </p>
      </section>

      {/* Retail preview */}
      <section className="mx-auto mt-[88px] max-w-[1320px] px-8">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-grotesk text-[28px] font-bold">Retail catalog preview</h2>
          <Link href="/mehsullar" className="text-[14px] font-semibold underline">
            View All Retail Products
          </Link>
        </div>
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {retailPreview.map((p) => (
            <div key={p.name}>
              <ImageSlot label="Product photo" className="h-[220px] w-full" rounded="rounded-[14px]" />
              <div className="px-0.5 pt-3.5">
                <div className="text-[15px] font-bold">{p.name}</div>
                <div className="mt-1 text-[12.5px] text-b2b-muted2">
                  {p.construction} · {p.firmness} · {p.height}
                </div>
                <Link
                  href="/mehsullar"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-bold text-b2b-ink"
                >
                  Request Price <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative mt-24 h-[340px] overflow-hidden">
        <ImageSlot variant="dark" rounded="rounded-none" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[rgba(26,23,18,.78)]" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="mb-5 font-grotesk text-[28px] font-bold">
            Looking for a mattress manufacturing partner?
          </h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/oem"
              className="rounded-[10px] bg-b2b-tan px-6 py-3.5 text-[15px] font-bold text-white transition hover:brightness-95"
            >
              Start an OEM Project
            </Link>
            <Link
              href="/quote"
              className="rounded-[10px] border-[1.5px] border-white px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
            >
              Request a B2B Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
