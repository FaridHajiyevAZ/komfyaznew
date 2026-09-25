import { getSettings } from "@/lib/content";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const s = await getSettings();
  const rows: [string, string][] = [
    ["Brend adı", s.fullName],
    ["Şüar", s.slogan],
    ["Telefon", s.phone],
    ["WhatsApp", s.whatsapp],
    ["Instagram", s.instagramHandle],
    ["Email", s.email],
    ["Ünvan", s.address],
    ["Fəaliyyət ili", String(s.since)],
  ];

  return (
    <div className="flex flex-col">
      <PageHeader title="Parametrlər" subtitle="Sayt üzrə ümumi məlumatlar" />
      <div className="flex flex-col gap-4 p-8">
        <div className="max-w-2xl border border-komfy-line bg-komfy-card">
          {rows.map(([k, v], i) => (
            <div
              key={k}
              className={`flex justify-between gap-6 px-5 py-3.5 text-[13.5px] ${
                i < rows.length - 1 ? "border-b border-komfy-line/60" : ""
              }`}
            >
              <span className="font-light text-komfy-muted">{k}</span>
              <span className="text-komfy-ink">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-[12.5px] font-light text-komfy-muted2">
          Bu parametrlərin redaktəsi növbəti mərhələdə qoşulacaq.
        </p>
      </div>
    </div>
  );
}
