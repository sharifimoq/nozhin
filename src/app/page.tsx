"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      {/* هدر */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-rose-500">نوژین</h1>
          <nav className="flex gap-6 text-sm text-gray-600">
            <a href="/products" className="hover:text-rose-500">محصولات</a>
            <a href="#" className="hover:text-rose-500">روتین من</a>
            <a href="#" className="hover:text-rose-500">درباره ما</a>
          </nav>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-600">
            سبد خرید
          </button>
        </div>
      </header>

      {/* هیرو */}
      <section className="bg-rose-50 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          روتین شخصی شما، فقط برای شما
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          با پاسخ به چند سوال ساده، روتین پوستی و مکمل مخصوص خودت رو بگیر
        </p>
        <button
  onClick={() => router.push("/quiz")}
  className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg hover:bg-rose-600 shadow-lg"
>
  شروع کن — رایگانه!
</button>
      </section>

      {/* ویژگی‌ها */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-2xl bg-rose-50">
          <div className="text-4xl mb-4">🧴</div>
          <h3 className="font-bold text-gray-800 mb-2">روتین پوستی</h3>
          <p className="text-gray-500 text-sm">بر اساس نوع پوست و نگرانی‌های شما</p>
        </div>
        <div className="p-6 rounded-2xl bg-rose-50">
          <div className="text-4xl mb-4">💊</div>
          <h3 className="font-bold text-gray-800 mb-2">روتین مکمل</h3>
          <p className="text-gray-500 text-sm">مکمل‌های مناسب سبک زندگی شما</p>
        </div>
        <div className="p-6 rounded-2xl bg-rose-50">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="font-bold text-gray-800 mb-2">هوش مصنوعی</h3>
          <p className="text-gray-500 text-sm">پیشنهاد شخصی‌سازی شده با Claude AI</p>
        </div>
      </section>
    </main>
  )
}