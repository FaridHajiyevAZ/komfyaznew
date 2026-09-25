import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

const stats = [
  { label: "Yeni sifariş", value: "7", note: "4-ü təsdiq gözləyir" },
  { label: "Aktiv sınaq", value: "12", note: "3-ü bu həftə bitir" },
  { label: "Həftəlik satış", value: "11 240 AZN", note: "keçən həftə 9 840 AZN" },
  { label: "Testi tamamlayan", value: "184", note: "31%-i sifariş verib" },
];

const tasks = [
  { dot: "#9C7A45", title: "4 rəy moderasiya gözləyir", sub: "Goldline (2), Adaptive (1), Rose (1)", action: "Bax" },
  { dot: "#9C7A45", title: "3 fərdi ölçü sorğusu cavabsızdır", sub: "Ən köhnəsi 2 gün əvvəl · 30% beh tələb olunur", action: "Bax" },
  { dot: "#B9B3A6", title: "Honeymoon üçün şəkil yoxdur", sub: "Kataloqda yer saxlayıcı göstərilir", action: "Yüklə" },
  { dot: "#B9B3A6", title: "3 sınaq müddəti bu həftə bitir", sub: "Müştəri ilə əlaqə saxlanmalıdır", action: "Siyahı" },
];

const topModels = [
  { name: "Goldline", pct: 38, gold: false },
  { name: "Adaptive", pct: 21, gold: false },
  { name: "Belissimo", pct: 14, gold: true },
  { name: "Morbido", pct: 11, gold: true },
  { name: "Digər 5 model", pct: 16, gold: true, muted: true },
];

const orders = [
  { id: "#1842", customer: "Aysel M.", model: "Goldline · 160×200", status: "Təsdiq gözləyir", tone: "gold", amount: "479 AZN", date: "14.08" },
  { id: "#1841", customer: "Rəşad Q.", model: "Adaptive · 180×200", status: "Çatdırılır", tone: "solid", amount: "1 279 AZN", date: "13.08" },
  { id: "#1840", customer: "Nigar S.", model: "Rose · 90×200", status: "Sınaqda · 12 gün", tone: "muted", amount: "199 AZN", date: "12.08" },
  { id: "#1839", customer: "Kənan Ə.", model: "Belissimo · 182×203 (fərdi)", status: "Beh gözlənilir", tone: "gold", amount: "865 AZN", date: "12.08" },
  { id: "#1838", customer: "Park Inn Baku", model: "Majestic · 26 ədəd", status: "Otel sorğusu", tone: "muted", amount: "—", date: "11.08" },
];

function statusClass(tone: string) {
  if (tone === "solid") return "border-komfy-green bg-komfy-green text-komfy-surface";
  if (tone === "gold") return "border-komfy-gold text-[#8A6A3B]";
  return "border-komfy-border text-komfy-muted";
}

export default async function DashboardPage() {
  const productCount = await prisma.product.count();

  return (
    <div className="flex flex-col">
      <PageHeader
        title="İdarə paneli"
        subtitle={`Son yenilənmə: bugün · ${productCount} aktiv məhsul · komfy.az`}
        action={{ label: "Yeni məhsul", href: "/admin/mehsullar" }}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-px border-b border-komfy-line bg-komfy-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 bg-komfy-panel px-6 py-[22px]">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-komfy-muted2">
              {s.label}
            </span>
            <span className="font-serif text-[34px] font-light leading-none text-komfy-ink">
              {s.value}
            </span>
            <span className="text-[12.5px] font-light text-komfy-muted">{s.note}</span>
          </div>
        ))}
      </div>

      <div className="grid border-b border-komfy-line lg:grid-cols-[1.35fr_1fr]">
        {/* Tasks */}
        <div className="flex flex-col gap-4 border-komfy-line p-8 lg:border-r">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-[19px] text-komfy-ink">Diqqət tələb edən işlər</h2>
            <span className="link-more">Hamısı</span>
          </div>
          <div className="flex flex-col gap-px border border-komfy-line bg-komfy-line">
            {tasks.map((t) => (
              <div key={t.title} className="flex items-center gap-4 bg-komfy-card px-[18px] py-[15px]">
                <span
                  className="h-1.5 w-1.5 flex-none rounded-full"
                  style={{ background: t.dot }}
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[13.5px] font-medium text-komfy-ink">{t.title}</span>
                  <span className="text-[12px] font-light text-komfy-muted2">{t.sub}</span>
                </div>
                <span className="ml-auto whitespace-nowrap text-[12.5px] text-komfy-green underline decoration-komfy-border underline-offset-2">
                  {t.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top models */}
        <div className="flex flex-col gap-4 p-8">
          <h2 className="font-serif text-[19px] text-komfy-ink">Ən çox satılan modellər</h2>
          <div className="flex flex-col gap-3.5">
            {topModels.map((m) => (
              <div key={m.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-komfy-ink">{m.name}</span>
                  <span className="font-mono text-komfy-muted">{m.pct}%</span>
                </div>
                <div className="h-1.5 bg-komfy-bg">
                  <div
                    className="h-1.5"
                    style={{
                      width: `${m.pct}%`,
                      background: m.muted ? "#C8BFAF" : m.gold ? "#9C7A45" : "#2F3B33",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] font-light text-komfy-muted2">
            Rəqəmlər nümunədir — real satış məlumatı qoşulduqda dəyişəcək.
          </p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="flex flex-col gap-4 p-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-[19px] text-komfy-ink">Son sifarişlər</h2>
          <span className="link-more">Bütün sifarişlər</span>
        </div>
        <div className="overflow-x-auto border border-komfy-line">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[100px_1.2fr_1.5fr_1fr_120px_90px] border-b border-komfy-line bg-komfy-panel text-[11px] font-medium uppercase tracking-[0.1em] text-komfy-muted2">
              {["Nömrə", "Müştəri", "Model və ölçü", "Status", "Məbləğ", "Tarix"].map((h, i) => (
                <span key={h} className={`px-4 py-3 ${i === 4 ? "text-right" : ""}`}>
                  {h}
                </span>
              ))}
            </div>
            {orders.map((o) => (
              <div
                key={o.id}
                className="grid grid-cols-[100px_1.2fr_1.5fr_1fr_120px_90px] items-center border-b border-komfy-line/60 bg-komfy-card text-[13px] font-light last:border-0"
              >
                <span className="px-4 py-3 font-mono">{o.id}</span>
                <span className="px-4 py-3">{o.customer}</span>
                <span className="px-4 py-3">{o.model}</span>
                <span className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusClass(
                      o.tone
                    )}`}
                  >
                    {o.status}
                  </span>
                </span>
                <span className="px-4 py-3 text-right font-mono">{o.amount}</span>
                <span className="px-4 py-3 text-komfy-muted2">{o.date}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[12px] font-light text-komfy-muted2">
          Sifariş sistemi hələ qoşulmayıb — bu cədvəl dizayn nümunəsidir.
        </p>
      </div>
    </div>
  );
}
