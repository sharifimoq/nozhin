import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-[var(--border)] bg-[var(--cream)]">
        <span className="text-2xl font-black text-[var(--green-dark)] tracking-tight">
          نوژ<span className="text-[var(--green-light)]">ین</span>
        </span>
        <ul className="flex gap-8 list-none">
          <li><Link href="/products" className="text-sm text-[var(--text-muted)] hover:text-[var(--green-dark)]">محصولات</Link></li>
          <li><Link href="/routine" className="text-sm text-[var(--text-muted)] hover:text-[var(--green-dark)]">روتین من</Link></li>
          <li><Link href="/about" className="text-sm text-[var(--text-muted)] hover:text-[var(--green-dark)]">درباره ما</Link></li>
        </ul>
        <Link
          href="/quiz"
          className="bg-[var(--green-dark)] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[var(--green-mid)] transition-colors"
        >
          شروع روتین
        </Link>
      </nav>

      {/* Hero */}
      <section className="grid grid-cols-2 gap-10 px-10 items-center min-h-[560px] bg-[var(--cream)]">
        <div className="py-16">
          <div className="inline-flex items-center gap-2 bg-[var(--green-pale)] text-[var(--green-mid)] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[var(--green-light)] rounded-full animate-pulse" />
            روتین شخصی‌سازی‌شده با هوش مصنوعی
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-tighter text-[var(--green-dark)] mb-5">
            پوست و بدنت<br/>
            رو <span className="text-[var(--green-light)]">بشناس</span>
          </h1>
          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-9 max-w-md">
            با ۵ سوال ساده، روتین کاملاً اختصاصی برای پوست و سلامتت دریافت کن —
            طراحی‌شده با هوش مصنوعی.
          </p>
          <div className="flex gap-4 items-center">
            <Link
              href="/quiz"
              className="bg-[var(--green-dark)] text-white text-sm font-bold px-9 py-4 rounded-full hover:bg-[var(--green-mid)] transition-colors"
            >
              روتین من رو بساز
            </Link>
            <Link href="/products" className="text-sm text-[var(--green-dark)] font-medium">
              بیشتر بدان ←
            </Link>
          </div>
        </div>

        {/* Card visual placeholder */}
        <div className="flex items-center justify-center h-[480px]">
          <div className="relative w-[300px]">
            <div className="absolute -top-5 right-5 -left-5 h-full bg-[var(--green-pale)] rounded-3xl border border-[rgba(82,183,136,0.3)]" />
            <div className="relative bg-white rounded-3xl p-7 shadow-lg border border-[var(--border)]">
              <div className="absolute -top-4 -left-4 bg-[var(--green-dark)] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg">
                ✦ روتین شخصی
              </div>
              <div className="text-[10px] font-semibold text-[var(--green-mid)] tracking-widest uppercase mb-4">روتین صبحانه شما</div>
              {[
                { icon: '🧴', name: 'سرم ویتامین C', sub: '۵ قطره — هر صبح', price: '۱۸۵٬۰۰۰' },
                { icon: '☀️', name: 'ضد آفتاب SPF50', sub: 'آخرین مرحله', price: '۲۲۰٬۰۰۰' },
                { icon: '💊', name: 'امگا ۳', sub: '۲ عدد با صبحانه', price: '۹۸٬۰۰۰' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
                  <div className="w-11 h-11 bg-[var(--green-pale)] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[var(--text)]">{item.name}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">{item.sub}</div>
                  </div>
                  <div className="text-sm font-bold text-[var(--green-mid)]">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="flex gap-3 px-10 py-7 border-t border-b border-[var(--border)] bg-white">
        {[
          { num: '۲۴۰۰+', label: 'روتین ساخته‌شده' },
          { num: '۹۸٪', label: 'رضایت مشتریان' },
          { num: '۱۲۰+', label: 'محصول معتبر' },
          { num: '۵ دقیقه', label: 'برای دریافت روتین' },
        ].map((s, i) => (
          <div key={i} className="flex-1 text-center py-4">
            <div className="text-3xl font-black text-[var(--green-dark)] tracking-tight">{s.num}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </main>
  )
}