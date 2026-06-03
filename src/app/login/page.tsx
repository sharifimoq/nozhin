"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // وقتی کاربر دکمه ورود رو می‌زنه
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // NextAuth لاگین رو مدیریت می‌کنه و session می‌سازه
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("ایمیل یا رمز اشتباهه");
      setLoading(false);
      return;
    }

    // لاگین موفق — بره صفحه اصلی
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-rose-50 flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md mx-4">

        {/* لوگو */}
        <h1 className="text-3xl font-bold text-rose-500 text-center mb-2">نوژین</h1>
        <p className="text-gray-400 text-center mb-8">ورود به حساب کاربری</p>

        {/* خطا */}
        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* فرم */}
        <div className="flex flex-col gap-4">
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
              placeholder="رمز عبورت رو بنویس"
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
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </div>

        {/* لینک ثبت‌نام */}
        <p className="text-center text-gray-400 text-sm mt-6">
          حساب نداری؟{" "}
          <a href="/register" className="text-rose-500 hover:underline">
            ثبت‌نام کن
          </a>
        </p>
      </div>
    </main>
  );
}