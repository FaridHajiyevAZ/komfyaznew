import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Rəylər"
        subtitle={`${reviews.length} rəy · ana səhifədə göstərilir`}
      />
      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-2 border border-komfy-line bg-komfy-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="tracking-[0.2em] text-[13px] text-komfy-gold">
                  {"★".repeat(r.stars)}
                  <span className="text-komfy-line2">{"★".repeat(5 - r.stars)}</span>
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                    r.status === "published"
                      ? "border-komfy-green text-komfy-green"
                      : "border-komfy-gold text-[#8A6A3B]"
                  }`}
                >
                  {r.status === "published" ? "Dərc olunub" : "Gözləyir"}
                </span>
              </div>
              <p className="font-serif text-[15px] font-light leading-[1.6] text-komfy-ink">
                {r.text}
              </p>
              <span className="text-[12.5px] text-komfy-muted2">
                {r.author} · {r.model}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[12.5px] font-light text-komfy-muted2">
          Rəylərin əlavə edilməsi/moderasiyası növbəti mərhələdə qoşulacaq.
        </p>
      </div>
    </div>
  );
}
