'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import NavbarActions from '@/components/NavbarActions'

const s = {
  cream: '#FAFAF8',
  greenDark: '#1A3A2A',
  greenMid: '#2D6A4F',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  sand: '#F4ECD8',
  text: '#1C1C1A',
  textMuted: '#5A5A56',
  border: 'rgba(26, 58, 42, 0.12)',
}

type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
  imageUrl?: string
}

const categoryLabels: Record<string, string> = {
  all: 'همه',
  skincare: 'مراقبت پوست',
  supplement: 'مکمل',
  sport: 'ورزشی',
  پوستی: 'مراقبت پوست',
  مکمل: 'مکمل',
  ورزشی: 'ورزشی',
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [added, setAdded] = useState<string | null>(null)
  const addToCart = useCartStore((state) => state.addItem)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))]

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const q = search.trim().toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  function handleAdd(product: Product) {
  addToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl ?? null, quantity: 1 })
  setAdded(product.id)
  setTimeout(() => setAdded(null), 1500)
}

  const categoryIcon: Record<string, string> = {
    skincare: '🧴', supplement: '💊', sport: '💪',
    پوستی: '🧴', مکمل: '💊', ورزشی: '💪',
  }

  return (
    <main style={{ fontFamily: "'Vazirmatn', sans-serif", direction: 'rtl', background: s.cream, minHeight: '100vh' }}>

      {/* Navbar */}
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

      {/* Header */}
      <div style={{ padding: '48px 48px 32px', borderBottom: `1px solid ${s.border}`, background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: s.greenDark, letterSpacing: -1, marginBottom: 8 }}>
              محصولات
            </h1>
            <p style={{ fontSize: 14, color: s.textMuted }}>
              {filtered.length} محصول
              {search && ` برای "${search}"`}
            </p>
          </div>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: 260 }}>
            <span style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              fontSize: 16, pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در محصولات..."
              style={{
                width: '100%', padding: '11px 42px 11px 14px',
                border: `1px solid ${s.border}`, borderRadius: 50,
                fontSize: 13, fontFamily: "'Vazirmatn', sans-serif",
                background: s.cream, outline: 'none', color: s.text,
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                fontFamily: "'Vazirmatn', sans-serif", cursor: 'pointer', border: 'none',
                background: activeCategory === cat ? s.greenDark : s.greenPale,
                color: activeCategory === cat ? 'white' : s.greenMid,
                transition: 'all 0.15s',
              }}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div style={{ padding: '40px 48px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: s.textMuted, fontSize: 15 }}>
            در حال بارگذاری...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: s.textMuted, fontSize: 15 }}>
            محصولی یافت نشد
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/products/${product.id}`)}
                style={{
                  background: 'white', borderRadius: 20,
                  border: `1px solid ${s.border}`, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  transition: 'box-shadow 0.2s, transform 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,58,42,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
              >
                {/* Image */}
                <div style={{
                  height: 200, background: s.greenPale,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 64,
                }}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    categoryIcon[product.category] ?? '📦'
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '20px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 600,
                    color: s.greenMid, background: s.greenPale,
                    padding: '3px 10px', borderRadius: 50, marginBottom: 10, alignSelf: 'flex-start',
                  }}>
                    {categoryLabels[product.category] ?? product.category}
                  </div>

                  <div style={{ fontSize: 16, fontWeight: 700, color: s.text, marginBottom: 6 }}>
                    {product.name}
                  </div>

                  {product.description && (
                    <div style={{ fontSize: 12, color: s.textMuted, lineHeight: 1.7, marginBottom: 12, flex: 1 }}>
                      {product.description.length > 80
                        ? product.description.slice(0, 80) + '...'
                        : product.description}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${s.border}` }}>
                    <div>
                      <span style={{ fontSize: 20, fontWeight: 900, color: s.greenDark }}>
                        {product.price.toLocaleString('fa-IR')}
                      </span>
                      <span style={{ fontSize: 11, color: s.textMuted, marginRight: 4 }}>تومان</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAdd(product) }}
                      style={{
                        background: added === product.id ? s.greenLight : s.greenDark,
                        color: 'white', border: 'none', borderRadius: 12,
                        padding: '10px 20px', fontSize: 13, fontWeight: 700,
                        fontFamily: "'Vazirmatn', sans-serif", cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      {added === product.id ? '✓ اضافه شد' : 'افزودن به سبد'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}