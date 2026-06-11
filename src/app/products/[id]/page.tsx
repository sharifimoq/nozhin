import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import NavbarActions from "@/components/NavbarActions";
import AddToCartButton from "./AddToCartButton";

const s = {
  cream: '#FAFAF8', greenDark: '#1A3A2A', greenMid: '#2D6A4F',
  greenLight: '#52B788', greenPale: '#D8F3DC', text: '#1C1C1A',
  textMuted: '#5A5A56', border: 'rgba(26, 58, 42, 0.12)',
};

const categoryLabels: Record<string, string> = {
  skincare: 'مراقبت پوست', supplement: 'مکمل', sport: 'ورزشی',
};
const categoryIcon: Record<string, string> = {
  skincare: '🧴', supplement: '💊', sport: '💪',
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  const related_same = await prisma.product.findMany({
    where: { category: product.category, id: { not: id } },
    take: 4,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl ?? undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IRR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main style={{ fontFamily: "'Vazirmatn', sans-serif", direction: 'rtl', background: s.cream, minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: `1px solid ${s.border}`, background: 'white',
      }}>
        <Link href="/" style={{ fontSize: 26, fontWeight: 900, color: s.greenDark, letterSpacing: -1, textDecoration: 'none' }}>
          نوژ<span style={{ color: s.greenLight }}>ین</span>
        </Link>
        <div style={{ display: 'flex', gap: 32 }}>
          <Link href="/products" style={{ fontSize: 14, color: s.greenDark, fontWeight: 600, textDecoration: 'none' }}>محصولات</Link>
          <Link href="/quiz" style={{ fontSize: 14, color: s.textMuted, textDecoration: 'none' }}>روتین من</Link>
          <Link href="/about" style={{ fontSize: 14, color: s.textMuted, textDecoration: 'none' }}>درباره ما</Link>
        </div>
        <NavbarActions />
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 48px' }}>

        {/* breadcrumb */}
        <div style={{ fontSize: 12, color: s.textMuted, marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/products" style={{ color: s.textMuted, textDecoration: 'none' }}>محصولات</Link>
          <span>/</span>
          <span style={{ color: s.greenMid }}>{categoryLabels[product.category] ?? product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* product detail */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 64, alignItems: 'start' }}>

          {/* image */}
          <div style={{
            background: s.greenPale, borderRadius: 24, overflow: 'hidden',
            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={undefined}
              />
            ) : (
              <span style={{ fontSize: 96 }}>{categoryIcon[product.category] ?? '📦'}</span>
            )}
          </div>

          {/* info */}
          <div style={{ paddingTop: 8 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              color: s.greenMid, background: s.greenPale,
              padding: '4px 14px', borderRadius: 50, marginBottom: 20,
            }}>
              {categoryIcon[product.category]} {categoryLabels[product.category] ?? product.category}
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 900, color: s.greenDark, lineHeight: 1.4, marginBottom: 16 }}>
              {product.name}
            </h1>

            <p style={{ fontSize: 14, color: s.textMuted, lineHeight: 2, marginBottom: 32 }}>
              {product.description}
            </p>

            <div style={{
              background: 'white', borderRadius: 20, border: `1px solid ${s.border}`,
              padding: '24px', marginBottom: 24,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: s.textMuted }}>قیمت</span>
                <div>
                  <span style={{ fontSize: 28, fontWeight: 900, color: s.greenDark }}>
                    {product.price.toLocaleString('fa-IR')}
                  </span>
                  <span style={{ fontSize: 12, color: s.textMuted, marginRight: 4 }}>تومان</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${s.border}` }}>
                <span style={{ fontSize: 13, color: s.textMuted }}>موجودی</span>
                <span style={{
                  fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 50,
                  background: product.stock > 0 ? s.greenPale : '#fef2f2',
                  color: product.stock > 0 ? s.greenMid : '#c0392b',
                }}>
                  {product.stock > 0 ? `${product.stock} عدد موجود` : 'ناموجود'}
                </span>
              </div>
            </div>

            <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, stock: product.stock }} />

            <Link href="/quiz" style={{
              display: 'block', textAlign: 'center', marginTop: 14, fontSize: 13,
              color: s.textMuted, textDecoration: 'none',
            }}>
              مطمئن نیستی؟ روتین شخصی بساز ←
            </Link>
          </div>
        </div>

        {/* related products */}
        {related_same.length > 0 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: s.greenDark, marginBottom: 24 }}>
              محصولات مشابه
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {related_same.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'white', borderRadius: 18, border: `1px solid ${s.border}`,
                    overflow: 'hidden', transition: 'box-shadow 0.2s',
                  }}>
                    <div style={{ height: 160, background: s.greenPale, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.imageUrl
                        ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: 48 }}>{categoryIcon[p.category] ?? '📦'}</span>
                      }
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: s.text, marginBottom: 6, lineHeight: 1.4 }}>{p.name}</div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: s.greenDark }}>
                        {p.price.toLocaleString('fa-IR')} <span style={{ fontSize: 10, color: s.textMuted, fontWeight: 400 }}>تومان</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
