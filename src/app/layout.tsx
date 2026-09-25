import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Source_Serif_4,
  Space_Grotesk,
  Karla,
} from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// B2B rebrand fontları
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — Satın almadan əvvəl sınayın`,
    template: `%s — ${site.name}`,
  },
  description:
    "KOMFY ortopedik matrasları: 9 model, 3 kateqoriya. 30 gün yat sonra seç, pulsuz çatdırılma, 10 ilə qədər zəmanət. 2015-ci ildən yerli istehsal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="az"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${grotesk.variable} ${karla.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
