import Link from "next/link";
import { b2bFooter, b2bContact } from "@/data/b2b";

export function B2bFooter() {
  return (
    <footer className="grid grid-cols-2 gap-6 bg-b2b-ink2 px-5 py-12 text-[13px] text-b2b-footer sm:px-8 md:grid-cols-3 lg:grid-cols-5">
      {b2bFooter.map((col) => (
        <div key={col.title}>
          <b className="text-white">{col.title}</b>
          <div className="mt-2 flex flex-col gap-1.5">
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="text-b2b-footer hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div>
        <b className="text-white">Contact</b>
        <div className="mt-2 leading-relaxed text-b2b-footer">
          {b2bContact.address}
          <br />
          {b2bContact.phone}
          <br />
          {b2bContact.email}
        </div>
      </div>
    </footer>
  );
}
