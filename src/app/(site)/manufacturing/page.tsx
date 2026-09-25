import type { Metadata } from "next";
import { ComingSoon } from "@/components/b2b/ComingSoon";

export const metadata: Metadata = { title: "Manufacturing" };

export default function ManufacturingPage() {
  return (
    <ComingSoon
      eyebrow="How it's made"
      title="Built in-house, from spring to stitch"
      text="Spring-unit manufacturing, foam cutting and layering, quilting and sewing, assembly, inspection and packaging — all on our own production floor."
    />
  );
}
