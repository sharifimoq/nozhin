import Link from 'next/link'
import NavbarActions from '@/components/NavbarActions'

export default function HomePage() {
  const styles = {
    cream: '#FAFAF8',
    greenDark: '#1A3A2A',
    greenMid: '#2D6A4F',
    greenLight: '#52B788',
    greenPale: '#D8F3DC',
    text: '#1C1C1A',
    textMuted: '#5A5A56',
    border: 'rgba(26, 58, 42, 0.12)',
  }

  return (
    <main style={{ fontFamily: "'Vazirmatn', sans-serif", direction: 'rtl', background: styles.cream, minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: `1px solid ${styles.border}`,
        background: 'white',
      }}>
        <span style={{ fontSize: 26, fontWeight: 900, color: styles.greenDark, letterSpacing: -1 }}>
          نوژ<span style={{ color: styles.greenLight }}>ین</span>
        </span>
        <div className="nav-links" style={{ display: 'flex', gap: 32 }}>
          <Link href="/products" style={{ fontSize: 14, color: styles.textMuted, textDecoration: 'none' }}>محصولات</Link>
          <Link href="/quiz" style={{ fontSize: 14, color: styles.textMuted, textDecoration: 'none' }}>روتین من</Link>
          <Link href="/about" style={{ fontSize: 14, color: styles.textMuted, textDecoration: 'none' }}>درباره ما</Link>
        </div>
        <NavbarActions />
      </nav>

      {/* Hero */}
      <section className="hero-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
        padding: '60px 48px', alignItems: 'center',
      }}>
        {/* Text */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: styles.greenPale, color: styles.greenMid,
            fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 50, marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, background: styles.greenLight, borderRadius: '50%', display: 'inline-block' }} />
            روتین شخصی‌سازی‌شده با هوش مصنوعی
          </div>

          <h1 style={{
            fontSize: 52, fontWeight: 900, lineHeight: 1.2,
            letterSpacing: -2, color: styles.greenDark, marginBottom: 20,
          }}>
            پوست و بدنت<br />
            رو <span style={{ color: styles.greenLight }}>بشناس</span>
          </h1>

          <p style={{ fontSize: 15, color: styles.textMuted, lineHeight: 1.9, marginBottom: 36, maxWidth: 420 }}>
            با ۵ سوال ساده، روتین کاملاً اختصاصی برای پوست و سلامتت دریافت کن —
            طراحی‌شده با هوش مصنوعی.
          </p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/quiz" style={{
              background: styles.greenDark, color: 'white', fontSize: 15, fontWeight: 700,
              padding: '14px 36px', borderRadius: 50, textDecoration: 'none',
            }}>
              روتین من رو بساز
            </Link>
            <Link href="/products" style={{ fontSize: 14, color: styles.greenDark, textDecoration: 'none' }}>
              بیشتر بدان ←
            </Link>
          </div>
        </div>

        {/* Card */}
        <div className="hero-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 300 }}>
            <div style={{
              position: 'absolute', top: -20, right: 20, left: -20, bottom: 0,
              background: styles.greenPale, borderRadius: 24,
              border: `1px solid rgba(82,183,136,0.3)`,
            }} />
            <div style={{
              position: 'relative', background: 'white', borderRadius: 24,
              padding: 28, border: `1px solid ${styles.border}`,
              boxShadow: '0 8px 40px rgba(26,58,42,0.10)',
            }}>
              <div style={{
                position: 'absolute', top: -16, left: -16,
                background: styles.greenDark, color: 'white',
                fontSize: 12, fontWeight: 600, padding: '8px 14px',
                borderRadius: 14, whiteSpace: 'nowrap',
              }}>
                ✦ روتین شخصی
              </div>

              <div style={{ fontSize: 10, fontWeight: 700, color: styles.greenMid, letterSpacing: 2, marginBottom: 16 }}>
                روتین صبحانه شما
              </div>

              {[
                { icon: '🧴', name: 'سرم ویتامین C', sub: '۵ قطره — هر صبح', price: '۱۸۵٬۰۰۰' },
                { icon: '☀️', name: 'ضد آفتاب SPF50', sub: 'آخرین مرحله', price: '۲۲۰٬۰۰۰' },
                { icon: '💊', name: 'امگا ۳', sub: '۲ عدد با صبحانه', price: '۹۸٬۰۰۰' },
              ].map((item, i, arr) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  borderBottom: i < arr.length - 1 ? `1px solid ${styles.border}` : 'none',
                }}>
                  <div style={{
                    width: 44, height: 44, background: styles.greenPale,
                    borderRadius: 14, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 20, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: styles.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: styles.textMuted, marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: styles.greenMid }}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{
        display: 'flex', borderTop: `1px solid ${styles.border}`,
        borderBottom: `1px solid ${styles.border}`, background: 'white',
        padding: '8px 48px',
      }}>
        {[
          { num: '۲۴۰۰+', label: 'روتین ساخته‌شده' },
          { num: '۹۸٪', label: 'رضایت مشتریان' },
          { num: '۱۲۰+', label: 'محصول معتبر' },
          { num: '۵ دقیقه', label: 'برای دریافت روتین' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: styles.greenDark, letterSpacing: -1 }}>{s.num}</div>
            <div style={{ fontSize: 12, color: styles.textMuted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

    </main>
  )
}