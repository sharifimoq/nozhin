"use client";
import { Suspense } from "react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
        const order = JSON.parse(savedOrder);
        fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...order, refId }),
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
      address: form.address, total: totalPrice(), items: items,
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

  const inputStyle = { width: "100%", border: "0.5px solid #E8E4DC", borderRadius: "12px", padding: "14px 16px", fontSize: "14px", outline: "none", color: "var(--dark)", background: "white" };

  if (status === "success") {
    return (
      <main style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }} dir="rtl">
        <div style={{ background: "white", borderRadius: "24px", padding: "48px", maxWidth: "400px", width: "100%", textAlign: "center", border: "0.5px solid #E8E4DC" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "24px", color: "var(--dark)", marginBottom: "8px" }}>پرداخت موفق!</h2>
          <p style={{ fontSize: "14px", color: "var(--light)", marginBottom: "8px" }}>سفارش شما ثبت شد</p>
          <p style={{ fontSize: "12px", color: "var(--light)", marginBottom: "24px" }}>کد پیگیری: {refId}</p>
          <button onClick={() => router.push("/")} style={{ background: "var(--sage)", color: "white", border: "none", padding: "12px 32px", borderRadius: "100px", fontSize: "14px", cursor: "pointer" }}>
            برگشت به خانه
          </button>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }} dir="rtl">
        <div style={{ background: "white", borderRadius: "24px", padding: "48px", maxWidth: "400px", width: "100%", textAlign: "center", border: "0.5px solid #E8E4DC" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>❌</div>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "24px", color: "var(--dark)", marginBottom: "8px" }}>پرداخت ناموفق</h2>
          <p style={{ fontSize: "14px", color: "var(--light)", marginBottom: "24px" }}>مشکلی پیش اومد — دوباره امتحان کن</p>
          <button onClick={() => router.push("/cart")} style={{ background: "var(--sage)", color: "white", border: "none", padding: "12px 32px", borderRadius: "100px", fontSize: "14px", cursor: "pointer" }}>
            برگشت به سبد خرید
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--cream)" }} dir="rtl">
      <header style={{ background: "var(--cream)", borderBottom: "0.5px solid #E8E4DC" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", textDecoration: "none" }}>نوژین</a>
          <h1 style={{ fontSize: "16px", fontWeight: "500", color: "var(--dark)" }}>تکمیل خرید</h1>
          <a href="/cart" style={{ fontSize: "13px", color: "var(--mid)", textDecoration: "none" }}>برگشت</a>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div style={{ flex: 1, background: "white", borderRadius: "20px", border: "0.5px solid #E8E4DC", padding: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", marginBottom: "24px" }}>اطلاعات تحویل</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px" }}>نام و نام خانوادگی</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="نام کامل" />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px" }}>ایمیل</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="example@email.com" />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px" }}>موبایل</label>
                <input type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} style={inputStyle} placeholder="09xxxxxxxxx" />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "var(--light)", display: "block", marginBottom: "8px" }}>آدرس</label>
                <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={{ ...inputStyle, resize: "none" } as React.CSSProperties} placeholder="آدرس کامل تحویل" rows={3} />
              </div>
            </div>
          </div>
          <div style={{ width: "280px" }}>
            <div style={{ background: "white", borderRadius: "20px", border: "0.5px solid #E8E4DC", padding: "24px", position: "sticky", top: "80px" }}>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "18px", color: "var(--dark)", marginBottom: "16px" }}>خلاصه سفارش</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--mid)" }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString("fa-IR")}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500", color: "var(--dark)", fontSize: "16px", borderTop: "0.5px solid #E8E4DC", paddingTop: "16px" }}>
                <span>مبلغ کل</span>
                <span>{totalPrice().toLocaleString("fa-IR")} تومان</span>
              </div>
              <button onClick={handlePayment} disabled={loading || items.length === 0} style={{ width: "100%", background: "var(--gold)", color: "white", border: "none", padding: "14px", borderRadius: "100px", fontSize: "14px", cursor: "pointer", marginTop: "20px", opacity: loading ? 0.7 : 1 }}>
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
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>در حال بارگذاری...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}