import type { Metadata } from "next";
import Link from 'next/link';
import NavbarActions from '@/components/NavbarActions';

export const metadata: Metadata = {
  title: "درباره ما",
  description: "نوژین — پلتفرم سلامت و زیبایی با روتین شخصی‌سازی‌شده توسط هوش مصنوعی.",
};

const s = {
  cream: '#FAFAF8',
  greenDark: '#1A3A2A',
  greenMid: '#2D6A4F',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  text: '#1C1C1A',
  textMuted: '#5A5A56',
  border: 'rgba(26, 58, 42, 0.12)',
}

export default function About() {
  return (
    <main style={{ fontFamily: "'Vazirmatn', sans-serif", direction: 'rtl', background: s.cream, minHeight: '100vh' }}>

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: `1px solid ${s.border}`, background: 'white',
      }}>
        <Link href="/" style={{ fontSize: 26, fontWeight: 900, color: s.greenDark, letterSpacing: -1, textDecoration: 'none' }}>
          نوژ<span style={{ color: s.greenLight }}>ین</span>
        </Link>
        <div style={{ display: 'flex', gap: 32 }}>
          <Link href="/products" style={{ fontSize: 14, color: s.textMuted, textDecoration: 'none' }}>محصولات</Link>
          <Link href="/quiz" style={{ fontSize: 14, color: s.textMuted, textDecoration: 'none' }}>روتین من</Link>
          <Link href="/about" style={{ fontSize: 14, color: s.greenDark, fontWeight: 600, textDecoration: 'none' }}>درباره ما</Link>
        </div>
        <NavbarActions />
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: s.greenPale, color: s.greenMid,
            fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 50,
            letterSpacing: 1, marginBottom: 20,
          }}>
            درباره نوژین
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: s.greenDark, lineHeight: 1.3, marginBottom: 16 }}>
            سلامت شخصی‌سازی‌شده<br />برای هر نفر
          </h1>
          <p style={{ fontSize: 15, color: s.textMuted, lineHeight: 1.9, maxWidth: 520, margin: '0 auto' }}>
            نوژین یه پلتفرم سلامت و زیباییه که با کمک هوش مصنوعی، روتین کاملاً اختصاصی برای پوست و سلامت هر فرد می‌سازه.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🌿', title: 'طبیعی و معتبر', desc: 'همه محصولات ما از برندهای معتبر و با استانداردهای بهداشتی بالا انتخاب شدن.' },
            { icon: '🤖', title: 'هوش مصنوعی', desc: 'روتین‌ها بر اساس جواب‌های شخصی شما با Claude AI ساخته میشن.' },
            { icon: '💚', title: 'مراقبت واقعی', desc: 'هدف ما نه فروش بیشتر، بلکه سلامت واقعی هر مشتریه.' },
            { icon: '🔒', title: 'امنیت و اعتماد', desc: 'اطلاعات شما محرمانه‌ست و پرداخت از طریق درگاه امن زرین‌پال انجام میشه.' },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'white', borderRadius: 20, border: `1px solid ${s.border}`,
              padding: '28px 24px',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.greenDark, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: s.textMuted, lineHeight: 1.8 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: s.greenDark, borderRadius: 24, padding: '40px 48px',
          textAlign: 'center', color: 'white',
        }}>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>
            آماده‌ای روتینت رو بسازی؟
          </div>
          <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 28, lineHeight: 1.8 }}>
            با ۵ سوال ساده، روتین کاملاً اختصاصی دریافت کن
          </p>
          <Link href="/quiz" style={{
            background: 'white', color: s.greenDark, fontSize: 14, fontWeight: 700,
            padding: '13px 36px', borderRadius: 50, textDecoration: 'none', display: 'inline-block',
          }}>
            شروع کن
          </Link>
        </div>
      </div>
    </main>
  )
}
