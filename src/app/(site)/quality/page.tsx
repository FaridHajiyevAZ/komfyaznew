import type { Metadata } from "next";
import { ComingSoon } from "@/components/b2b/ComingSoon";

export const metadata: Metadata = { title: "Quality & Compliance" };

export default function QualityPage() {
  return (
    <ComingSoon
      eyebrow="Quality & compliance"
      title="Checked at every stage, before it ships"
      text="Raw-material control, in-process checks and final inspection. Certificates and test reports are shown once uploaded — none implied without a document on file."
    />
  );
}
