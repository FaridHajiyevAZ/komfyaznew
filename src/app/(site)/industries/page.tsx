import type { Metadata } from "next";
import { ComingSoon } from "@/components/b2b/ComingSoon";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  return (
    <ComingSoon
      eyebrow="Industries served"
      title="Mattress supply for every sector"
      text="Brands, retail chains, hotels, healthcare, and institutional projects — with custom dimensions and commercial-grade durability."
    />
  );
}
