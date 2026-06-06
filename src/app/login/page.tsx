"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

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

    router.push("/");
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
          <p style={{ fontSize: "13px", color: "var(--light)", fontWeight: "300" }}>خوش برگشتی</p>
        </div>

        <div style={{ background: "white", borderRadius: "24px", border: "0.5px solid #E8E4DC", padding: "36px" }}>

          {error && (
            <div style={{ background: "#FEF2F2", color: "#DC2626", padding: "12px 16px", borderRadius: "12px", fontSize: "13px", marginBottom: "20px" }}>
              {error}
            </div>
          )}

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
              placeholder="رمز عبورت رو بنویس"
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
            {loading ? "در حال ورود..." : "ورود"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--light)", marginTop: "20px" }}>
            حساب نداری؟{" "}
            <a href="/register" style={{ color: "var(--sage)", textDecoration: "none" }}>ثبت‌نام کن</a>
          </p>
        </div>
      </div>
    </main>
  );
}