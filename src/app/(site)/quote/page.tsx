import type { Metadata } from "next";
import { ComingSoon } from "@/components/b2b/ComingSoon";

export const metadata: Metadata = { title: "Request a Quote" };

export default function QuotePage() {
  return (
    <ComingSoon
      eyebrow="Request a quote"
      title="Tell us about your project"
      text="OEM, private label or bulk B2B supply — share your specification and volume, and our team will prepare a tailored quote. Full request form coming next."
    />
  );
}
