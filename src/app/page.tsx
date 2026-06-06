"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen" style={{ background: "var(--cream)" }} dir="rtl">

      {/* هدر */}
      <header style={{ background: "var(--cream)", borderBottom: "0.5px solid #E8E4DC" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{ background: "var(--sage)", borderRadius: "10px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontFamily: "var(--font-playfair)", fontSize: "16px" }}>ن</span>
            </div>
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)" }}>نوژین</span>
          </div>

          <nav className="flex gap-8 text-sm" style={{ color: "var(--mid)" }}>
            <a href="/products" className="hover:text-black transition-colors">محصولات</a>
            <a href="/quiz" className="hover:text-black transition-colors">روتین من</a>
            <a href="/profile" className="hover:text-black transition-colors">پروفایل</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/cart" style={{ color: "var(--mid)", fontSize: "14px" }} className="hover:text-black transition-colors">سبد خرید</a>
            <a href="/login" style={{ background: "var(--sage)", color: "white", padding: "8px 20px", borderRadius: "100px", fontSize: "13px" }}>
              ورود
            </a>
          </div>
        </div>
      </header>

      {/* هیرو */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <div style={{ background: "var(--sage-light)", color: "var(--sage)", fontSize: "12px", padding: "6px 18px", borderRadius: "100px", letterSpacing: "0.08em", marginBottom: "24px", fontWeight: "500" }}>
          هوش مصنوعی + سلامت
        </div>

        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 5vw, 64px)", color: "var(--dark)", lineHeight: "1.2", marginBottom: "20px", maxWidth: "700px" }}>
          روتین شخصی شما،<br />فقط برای شما
        </h1>

        <p style={{ fontSize: "16px", color: "var(--mid)", lineHeight: "1.8", marginBottom: "36px", maxWidth: "480px", fontWeight: "300" }}>
          با پاسخ به چند سوال ساده، روتین پوستی و مکمل مخصوص خودت رو بگیر
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/quiz")}
            style={{ background: "var(--sage)", color: "white", padding: "14px 32px", borderRadius: "100px", fontSize: "15px", border: "none", cursor: "pointer", letterSpacing: "0.02em" }}
          >
            شروع کن — رایگانه
          </button>
          <button
            onClick={() => router.push("/products")}
            style={{ background: "transparent", color: "var(--sage)", padding: "14px 32px", borderRadius: "100px", fontSize: "15px", border: "1px solid var(--sage)", cursor: "pointer" }}
          >
            محصولات
          </button>
        </div>
      </section>

      {/* ویژگی‌ها */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div style={{ background: "white", borderRadius: "20px", padding: "32px", border: "0.5px solid #E8E4DC" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🧴</div>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", marginBottom: "8px" }}>روتین پوستی</h3>
            <p style={{ fontSize: "14px", color: "var(--light)", lineHeight: "1.7", fontWeight: "300" }}>بر اساس نوع پوست و نگرانی‌های شما</p>
          </div>
          <div style={{ background: "white", borderRadius: "20px", padding: "32px", border: "0.5px solid #E8E4DC" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>💊</div>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", marginBottom: "8px" }}>روتین مکمل</h3>
            <p style={{ fontSize: "14px", color: "var(--light)", lineHeight: "1.7", fontWeight: "300" }}>مکمل‌های مناسب سبک زندگی شما</p>
          </div>
          <div style={{ background: "var(--sage-light)", borderRadius: "20px", padding: "32px", border: "0.5px solid var(--sage-mid)" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🤖</div>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", marginBottom: "8px" }}>هوش مصنوعی</h3>
            <p style={{ fontSize: "14px", color: "var(--mid)", lineHeight: "1.7", fontWeight: "300" }}>پیشنهاد شخصی‌سازی شده با Claude AI</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--dark)", margin: "0 24px 48px", borderRadius: "24px" }} className="max-w-6xl mx-auto">
        <div className="px-8 py-16 text-center">
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "36px", color: "white", marginBottom: "16px" }}>
            از کجا شروع کنم؟
          </h2>
          <p style={{ fontSize: "15px", color: "#9A9A9A", marginBottom: "28px", fontWeight: "300" }}>
            فقط ۵ سوال — روتین کاملت آماده‌ست
          </p>
          <button
            onClick={() => router.push("/quiz")}
            style={{ background: "var(--gold)", color: "white", padding: "14px 36px", borderRadius: "100px", fontSize: "15px", border: "none", cursor: "pointer" }}
          >
            شروع پرسشنامه
          </button>
        </div>
      </section>

    </main>
  );
}