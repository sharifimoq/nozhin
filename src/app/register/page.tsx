"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { s, btn, input, card, font } from '@/lib/style';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
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
    router.push("/login");
  };

  return (
    <main style={{
      minHeight: "100vh", background: s.cream,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: font, direction: "rtl", padding: "24px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* لوگو */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/" style={{ textDecoration: "none", fontSize: 26, fontWeight: 900, color: s.greenDark }}>
            نوژ<span style={{ color: s.greenLight }}>ین</span>
          </a>
          <p style={{ fontSize: 13, color: s.textMuted, marginTop: 6 }}>بیا شروع کنیم</p>
        </div>

        <div style={{ ...card, padding: "36px 32px" }}>

          {error && (
            <div style={{
              background: "#FEF2F2", color: "#DC2626",
              padding: "12px 16px", borderRadius: 12,
              fontSize: 13, marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          {[
            { label: "نام", key: "name", type: "text", placeholder: "اسمت رو بنویس" },
            { label: "ایمیل", key: "email", type: "email", placeholder: "example@email.com" },
            { label: "رمز عبور", key: "password", type: "password", placeholder: "حداقل ۸ کاراکتر" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: s.textMuted, display: "block", marginBottom: 8, fontWeight: 600 }}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={input}
              />
            </div>
          ))}

          <div style={{ marginTop: 12 }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ ...btn.primary, width: "100%", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: s.textMuted, marginTop: 20 }}>
            قبلاً ثبت‌نام کردی؟{" "}
            <a href="/login" style={{ color: s.greenMid, textDecoration: "none", fontWeight: 700 }}>
              وارد شو
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}