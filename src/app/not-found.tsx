import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh", background: "#FAFAF8",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Vazirmatn', sans-serif", direction: "rtl", padding: "24px",
    }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ fontSize: 80, marginBottom: 8 }}>🌿</div>
        <div style={{ fontSize: 72, fontWeight: 900, color: "#1A3A2A", lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A3A2A", marginBottom: 12 }}>
          این صفحه وجود نداره
        </h1>
        <p style={{ fontSize: 14, color: "#5A5A56", lineHeight: 1.8, marginBottom: 32 }}>
          شاید آدرس رو اشتباه نوشتی یا این صفحه حذف شده.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/" style={{
            background: "#1A3A2A", color: "white", padding: "13px 32px",
            borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none",
          }}>
            برگشت به خانه
          </Link>
          <Link href="/products" style={{
            background: "transparent", color: "#2D6A4F", padding: "13px 32px",
            borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: "none",
            border: "1px solid #2D6A4F",
          }}>
            محصولات
          </Link>
        </div>
      </div>
    </main>
  );
}
