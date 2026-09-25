import { prisma } from "./prisma";
import type { Product, Category, SizePrice, Layer } from "@/data/products";
import { site as siteDefaults } from "@/data/site";

type DbProductWithSizes = Awaited<
  ReturnType<typeof prisma.product.findFirst>
> & { sizes: DbSize[]; category: { name: string } };

interface DbSize {
  label: string;
  price: number;
  discountPrice: number | null;
  active: boolean;
  order: number;
}

function mapSizes(sizes: DbSize[]): SizePrice[] {
  return sizes
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ size: s.label, price: s.discountPrice ?? s.price }));
}

// DB sətrini saytın gözlədiyi `Product` formasına çevirir
function toPublic(p: DbProductWithSizes): Product {
  const sizes = mapSizes(p.sizes as DbSize[]);
  const prices = sizes.map((s) => s.price);
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category.name as Category,
    priceFrom: prices.length ? Math.min(...prices) : 0,
    priceTo: prices.length ? Math.max(...prices) : 0,
    heightCm: p.heightCm,
    springType: p.springType,
    comfortLayer: p.comfortLayer,
    firmness: p.firmness,
    firmnessPct: p.firmnessPct,
    fabric: p.fabric,
    cooling: p.cooling,
    hypoallergenic: p.hypoallergenic,
    warrantyYears: p.warrantyYears,
    trialDays: p.trialDays,
    image: p.image,
    popular: p.popular,
    specLine: p.specLine,
    shortDescription: p.shortDescription,
    description: p.description,
    whoFor: safeJson<string[]>(p.whoFor, []),
    whoNot: p.whoNot ?? undefined,
    layers: p.layers ? safeJson<Layer[]>(p.layers, []) : undefined,
    sizes,
  };
}

function safeJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    include: { category: true, sizes: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return rows.map((r) => toPublic(r as unknown as DbProductWithSizes));
}

// Ana səhifədə göstərilməsi admin-də seçilmiş (showOnHome) məhsullar
export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true, showOnHome: true },
    include: { category: true, sizes: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    take: limit,
  });
  return rows.map((r) => toPublic(r as unknown as DbProductWithSizes));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, sizes: true },
  });
  if (!row || !row.active) return undefined;
  return toPublic(row as unknown as DbProductWithSizes);
}

export async function getProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export interface PublicReview {
  stars: number;
  text: string;
  author: string;
  model: string;
}

export async function getReviews(): Promise<PublicReview[]> {
  const rows = await prisma.review.findMany({
    where: { status: "published" },
    orderBy: { order: "asc" },
  });
  return rows.map((r) => ({
    stars: r.stars,
    text: r.text,
    author: r.author,
    model: r.model,
  }));
}

export type SiteSettings = typeof siteDefaults;

export async function getSettings(): Promise<SiteSettings> {
  const row = await prisma.setting.findUnique({ where: { id: 1 } });
  if (!row) return siteDefaults;
  return { ...siteDefaults, ...safeJson<Partial<SiteSettings>>(row.data, {}) };
}
