import { redirect } from "next/navigation";
import { getSession, roleLabel } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar, type NavSection } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [productCount, categoryCount, pendingReviews, reviewCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.review.count({ where: { status: "pending" } }),
    prisma.review.count(),
  ]);

  const sections: NavSection[] = [
    {
      label: "Kataloq",
      items: [
        { label: "İdarə paneli", href: "/admin", ready: true },
        { label: "Məhsullar", href: "/admin/mehsullar", badge: String(productCount), ready: true },
        { label: "Ölçü və qiymətlər", href: "/admin/mehsullar", ready: false },
        { label: "Kateqoriyalar", badge: String(categoryCount), ready: false },
      ],
    },
    {
      label: "Satış",
      items: [
        { label: "Sifarişlər", badge: "7", badgeGold: true, ready: false },
        { label: "30 gün sınaq", badge: "12", ready: false },
        { label: "Fərdi ölçü sorğuları", badge: "3", ready: false },
        { label: "Otel sorğuları", badge: "2", ready: false },
      ],
    },
    {
      label: "Kontent",
      items: [
        {
          label: "Rəylər",
          href: "/admin/reyler",
          badge: pendingReviews > 0 ? String(pendingReviews) : String(reviewCount),
          badgeGold: pendingReviews > 0,
          ready: true,
        },
        { label: "Səhifə blokları", ready: false },
        { label: "Rahatlıq testi", ready: false },
        { label: "Media kitabxanası", ready: false },
      ],
    },
    {
      label: "Sistem",
      items: [
        { label: "Parametrlər", href: "/admin/parametrler", ready: true },
        { label: "İstifadəçi və rollar", ready: false },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        sections={sections}
        userName={session.name}
        roleLabel={roleLabel(session.role)}
      />
      <div className="flex min-w-0 flex-1 flex-col bg-komfy-surface">{children}</div>
    </div>
  );
}
