"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // وقتی کاربر فرم رو submit می‌کنه
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // اطلاعات رو به API ثبت‌نام می‌فرستیم
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    // ثبت‌نام موفق — بره صفحه لاگین
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-rose-50 flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md mx-4">
        
        {/* لوگو */}
        <h1 className="text-3xl font-bold text-rose-500 text-center mb-2">نوژین</h1>
        <p className="text-gray-400 text-center mb-8">ثبت‌نام در نوژین</p>

        {/* خطا */}
        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* فرم */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">نام</label>
            <input
              type="text"
              placeholder="اسمت رو بنویس"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">ایمیل</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">رمز عبور</label>
            <input
              type="password"
              placeholder="حداقل ۸ کاراکتر"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 disabled:opacity-50 mt-2"
          >
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </div>

        {/* لینک لاگین */}
        <p className="text-center text-gray-400 text-sm mt-6">
          قبلاً ثبت‌نام کردی؟{" "}
          <a href="/login" className="text-rose-500 hover:underline">
            وارد شو
          </a>
        </p>
      </div>
    </main>
  );
}