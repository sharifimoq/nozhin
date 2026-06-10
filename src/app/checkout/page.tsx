"use client";
import { Suspense, useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter, useSearchParams } from "next/navigation";
import { s, btn, input, card, font } from '@/lib/style';

function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const refId = searchParams.get("ref_id");
  const [form, setForm] = useState({ name: "", email: "", mobile: "", address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "success") {
      const savedOrder = localStorage.getItem("pendingOrder");
      if (savedOrder) {
        fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...JSON.parse(savedOrder), refId }),
        });
        localStorage.removeItem("pendingOrder");
        clearCart();
      }
    }
  }, [status]);

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.mobile) {
      alert("لطفاً همه فیلدها رو پر کن");
      return;
    }
    setLoading(true);
    localStorage.setItem("pendingOrder", JSON.stringify({
      name: form.name, email: form.email, mobile: form.mobile,
      address: form.address, total: totalPrice(), items,
    }));
    const res = await fetch("/api/payment/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice(), description: "خرید از فروشگاه نوژین", email: form.email, mobile: form.mobile }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("خطا در ایجاد پرداخت");
      setLoading(false);
    }
  };

  const fields = [
    { label: "نام و نام خانوادگی", key: "name", type: "text", placeholder: "نام کامل" },
    { label: "ایمیل", key: "email", type: "email", placeholder: "example@email.com" },
    { label: "موبایل", key: "mobile", type: "tel", placeholder: "09xxxxxxxxx" },
  ];

  // صفحه موفقیت
  if (status === "success") {
    return (
      <main style={{ minHeight: "100vh", background: s.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, direction: "rtl" }}>
        <div style={{ ...card, padding: "48px", maxWidth: 400, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: s.greenDark, marginBottom: 8 }}>پرداخت موفق!</h2>
          <p style={{ fontSize: 14, color: s.textMuted, marginBottom: 8 }}>سفارش شما ثبت شد</p>
          <p style={{ fontSize: 12, color: s.textMuted, marginBottom: 28 }}>کد پیگیری: {refId}</p>
          <button onClick={() => router.push("/")} style={{ ...btn.primary }}>
            برگشت به خانه
          </button>
        </div>
      </main>
    );
  }

  // صفحه ناموفق
  if (status === "failed") {
    return (
      <main style={{ minHeight: "100vh", background: s.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, direction: "rtl" }}>
        <div style={{ ...card, padding: "48px", maxWidth: 400, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>❌</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: s.greenDark, marginBottom: 8 }}>پرداخت ناموفق</h2>
          <p style={{ fontSize: 14, color: s.textMuted, marginBottom: 28 }}>مشکلی پیش اومد — دوباره امتحان کن</p>
          <button onClick={() => router.push("/cart")} style={{ ...btn.primary }}>
            برگشت به سبد خرید
          </button>
        </div>
      </main>
    );
  }

  // صفحه اصلی checkout
  return (
    <main style={{ minHeight: "100vh", background: s.cream, fontFamily: font, direction: "rtl" }}>

      {/* Navbar */}
      <nav style={{
        background: "white", borderBottom: `1px solid ${s.border}`,
        padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" style={{ fontSize: 26, fontWeight: 900, color: s.greenDark, textDecoration: "none" }}>
          نوژ<span style={{ color: s.greenLight }}>ین</span>
        </a>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: s.text }}>تکمیل خرید</h1>
        <a href="/cart" style={{ fontSize: 13, color: s.textMuted, textDecoration: "none" }}>← برگشت</a>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <div className="checkout-layout" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* فرم اطلاعات */}
          <div style={{ flex: 1, ...card, padding: "28px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: s.greenDark, marginBottom: 24 }}>
              اطلاعات تحویل
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {fields.map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: s.textMuted, display: "block", marginBottom: 8, fontWeight: 600 }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={input}
                  />
                </div>
              ))}

              <div>
                <label style={{ fontSize: 12, color: s.textMuted, display: "block", marginBottom: 8, fontWeight: 600 }}>
                  آدرس
                </label>
                <textarea
                  placeholder="آدرس کامل تحویل"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={3}
                  style={{ ...input, resize: "none" } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* خلاصه سفارش */}
          <div className="checkout-sidebar" style={{ width: 280, flexShrink: 0 }}>
            <div style={{ ...card, padding: "24px", position: "sticky", top: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.text, marginBottom: 20 }}>
                خلاصه سفارش
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: s.textMuted }}>
                    <span>{(item.price * item.quantity).toLocaleString("fa-IR")}</span>
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: "flex", justifyContent: "space-between",
                borderTop: `1px solid ${s.border}`, paddingTop: 16,
                fontSize: 16, fontWeight: 900, color: s.greenDark,
              }}>
                <span>{totalPrice().toLocaleString("fa-IR")} تومان</span>
                <span>مبلغ کل</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || items.length === 0}
                style={{
                  width: "100%", background: s.greenDark, color: "white",
                  border: "none", borderRadius: 50, padding: "14px",
                  fontSize: 14, fontWeight: 700, fontFamily: font,
                  cursor: "pointer", marginTop: 20,
                  opacity: loading || items.length === 0 ? 0.6 : 1,
                }}
              >
                {loading ? "در حال انتقال..." : "پرداخت با زرین‌پال"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: s.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font }}>
        در حال بارگذاری...
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}