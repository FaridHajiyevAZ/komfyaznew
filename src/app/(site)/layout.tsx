import { B2bHeader } from "@/components/b2b/B2bHeader";
import { B2bFooter } from "@/components/b2b/B2bFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <B2bHeader />
      <main className="min-h-screen bg-b2b-bg">{children}</main>
      <B2bFooter />
    </>
  );
}
