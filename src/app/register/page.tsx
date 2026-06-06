"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const inputStyle = {
    width: "100%",
    border: "0.5px solid #E8E4DC",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-inter)",
    color: "var(--dark)",
    background: "white",
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }} dir="rtl">
      <div style={{ width: "100%", maxWidth: "420px", margin: "0 16px" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <div style={{ background: "var(--sage)", borderRadius: "10px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontFamily: "var(--font-playfair)", fontSize: "16px" }}>ن</span>
            </div>
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "22px", color: "var(--dark)" }}>نوژین</span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--light)", fontWeight: "300" }}>بیا شروع کنیم</p>
        </div>

        <div style={{ background: "white", borderRadius: "24px", border: "0.5px solid #E8E4DC", padding: "36px" }}>

          {error && (
            <div style={{ background: "#FEF2F2", color: "#DC2626", padding: "12px 16px", borderRadius: "12px", fontSize: "13px", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px", letterSpacing: "0.04em" }}>نام</label>
            <input
              type="text"
              placeholder="اسمت رو بنویس"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px", letterSpacing: "0.04em" }}>ایمیل</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px", letterSpacing: "0.04em" }}>رمز عبور</label>
            <input
              type="password"
              placeholder="حداقل ۸ کاراکتر"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", background: "var(--sage)", color: "white", border: "none", padding: "14px", borderRadius: "100px", fontSize: "14px", cursor: "pointer", opacity: loading ? 0.7 : 1, fontFamily: "var(--font-inter)" }}
          >
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--light)", marginTop: "20px" }}>
            قبلاً ثبت‌نام کردی؟{" "}
            <a href="/login" style={{ color: "var(--sage)", textDecoration: "none" }}>وارد شو</a>
          </p>
        </div>
      </div>
    </main>
  );
}