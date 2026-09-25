import type { Metadata } from "next";
import { ComingSoon } from "@/components/b2b/ComingSoon";

export const metadata: Metadata = { title: "OEM & Private Label" };

export default function OemPage() {
  return (
    <ComingSoon
      eyebrow="OEM & Private Label"
      title="Your brand, our production floor."
      text="Spec-to-shipment manufacturing for mattress brands and distributors — from co-development to packaged, branded shipment."
    />
  );
}
