"use client";
import { Suspense, useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { s, btn, input, card, font } from '@/lib/style';
import ToastContainer, { showToast } from "@/components/Toast";

function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const refId = searchParams.get("ref_id");
  const [form, setForm] = useState({ name: "", email: "", mobile: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponLabel, setCouponLabel] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

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

  const finalTotal = Math.max(0, totalPrice() - couponDiscount);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    const res = await fetch("/api/coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode, total: totalPrice() }),
    });
    const data = await res.json();
    if (res.ok) {
      setCouponDiscount(data.discount);
      setCouponLabel(data.label);
      setCouponError("");
    } else {
      setCouponDiscount(0);
      setCouponLabel("");
      setCouponError(data.error);
    }
    setCouponLoading(false);
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.mobile) {
      showToast("لطفاً نام، ایمیل و موبایل رو پر کن", "error");
      return;
    }
    setLoading(true);
    localStorage.setItem("pendingOrder", JSON.stringify({
      name: form.name, email: form.email, mobile: form.mobile,
      address: form.address, total: finalTotal, items,
      couponCode: couponDiscount > 0 ? couponCode : undefined,
    }));
    const res = await fetch("/api/payment/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: finalTotal, description: "خرید از فروشگاه نوژین", email: form.email, mobile: form.mobile }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      showToast("خطا در اتصال به درگاه پرداخت — لطفاً دوباره تلاش کن", "error");
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
        <div style={{ ...card, padding: "48px", maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: s.greenDark, marginBottom: 8 }}>پرداخت موفق!</h2>
          <p style={{ fontSize: 14, color: s.textMuted, marginBottom: 8 }}>سفارشت ثبت شد و به زودی ارسال می‌شه</p>
          {refId && (
            <div style={{
              background: s.cream, borderRadius: 12, padding: "10px 20px",
              fontSize: 12, color: s.textMuted, marginBottom: 28, display: "inline-block",
            }}>
              کد پیگیری: <span style={{ fontFamily: "monospace", color: s.greenMid, fontWeight: 700 }}>{refId}</span>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/orders" style={{ ...btn.primary, textDecoration: "none", display: "block", padding: "14px" }}>
              مشاهده سفارشات
            </Link>
            <button onClick={() => router.push("/")} style={{ background: "transparent", border: "none", color: s.textMuted, fontSize: 13, cursor: "pointer", fontFamily: font }}>
              برگشت به خانه
            </button>
          </div>
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
      <ToastContainer />

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

              {/* کد تخفیف */}
              <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: 16, marginTop: 4 }}>
                <label style={{ fontSize: 11, color: s.textMuted, fontWeight: 600, display: "block", marginBottom: 8 }}>
                  کد تخفیف
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="مثلاً NOZHIN20"
                    disabled={couponDiscount > 0}
                    style={{
                      flex: 1, padding: "9px 12px", border: `1px solid ${couponDiscount > 0 ? s.greenLight : s.border}`,
                      borderRadius: 10, fontSize: 12, fontFamily: font,
                      background: couponDiscount > 0 ? "#f0fdf4" : "white", outline: "none",
                    }}
                  />
                  {couponDiscount > 0 ? (
                    <button onClick={() => { setCouponDiscount(0); setCouponLabel(""); setCouponCode(""); }} style={{
                      background: "#fef2f2", color: "#c0392b", border: "none", borderRadius: 10,
                      padding: "9px 12px", fontSize: 12, cursor: "pointer", fontFamily: font, fontWeight: 600,
                    }}>حذف</button>
                  ) : (
                    <button onClick={applyCoupon} disabled={couponLoading || !couponCode.trim()} style={{
                      background: s.greenDark, color: "white", border: "none", borderRadius: 10,
                      padding: "9px 14px", fontSize: 12, cursor: "pointer", fontFamily: font, fontWeight: 600,
                      opacity: couponLoading || !couponCode.trim() ? 0.5 : 1,
                    }}>{couponLoading ? "..." : "اعمال"}</button>
                  )}
                </div>
                {couponError && <p style={{ fontSize: 11, color: "#c0392b", marginTop: 6 }}>{couponError}</p>}
                {couponLabel && <p style={{ fontSize: 11, color: s.greenMid, marginTop: 6, fontWeight: 700 }}>✓ {couponLabel} اعمال شد</p>}
              </div>

              {/* جمع نهایی */}
              <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: 16, marginTop: 16 }}>
                {couponDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: s.textMuted, marginBottom: 8 }}>
                    <span style={{ color: "#c0392b" }}>− {couponDiscount.toLocaleString("fa-IR")} تومان</span>
                    <span>تخفیف</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 900, color: s.greenDark }}>
                  <span>{finalTotal.toLocaleString("fa-IR")} تومان</span>
                  <span>مبلغ کل</span>
                </div>
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