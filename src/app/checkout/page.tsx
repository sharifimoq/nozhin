"use client";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const refId = searchParams.get("ref_id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  // بعد از پرداخت موفق، سفارش رو ذخیره می‌کنیم
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

    // اطلاعات سفارش رو ذخیره می‌کنیم تا بعد از پرداخت بتونیم توی دیتابیس بذاریم
    localStorage.setItem("pendingOrder", JSON.stringify({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      address: form.address,
      total: totalPrice(),
      items: items,
    }));

    const res = await fetch("/api/payment/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalPrice(),
        description: "خرید از فروشگاه نوژین",
        email: form.email,
        mobile: form.mobile,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("خطا در ایجاد پرداخت");
      setLoading(false);
    }
  };

  // پرداخت موفق
  if (status === "success") {
    return (
      <main className="min-h-screen bg-rose-50 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">پرداخت موفق!</h2>
          <p className="text-gray-400 mb-2">سفارش شما ثبت شد</p>
          <p className="text-sm text-gray-400 mb-6">کد پیگیری: {refId}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600"
          >
            برگشت به خانه
          </button>
        </div>
      </main>
    );
  }

  // پرداخت ناموفق
  if (status === "failed") {
    return (
      <main className="min-h-screen bg-rose-50 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-lg">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">پرداخت ناموفق</h2>
          <p className="text-gray-400 mb-6">مشکلی پیش اومد — دوباره امتحان کن</p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600"
          >
            برگشت به سبد خرید
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-rose-50" dir="rtl">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-rose-500">نوژین</a>
          <h1 className="text-lg font-bold text-gray-700">تکمیل خرید</h1>
          <a href="/cart" className="text-sm text-gray-500 hover:text-rose-500">برگشت</a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-6">اطلاعات تحویل</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
                  placeholder="نام کامل"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">ایمیل</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">موبایل</label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
                  placeholder="09xxxxxxxxx"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">آدرس</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400"
                  placeholder="آدرس کامل تحویل"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-72">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4">خلاصه سفارش</h2>
              <div className="flex flex-col gap-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-500">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString("fa-IR")}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-4">
                <span>مبلغ کل</span>
                <span>{totalPrice().toLocaleString("fa-IR")} تومان</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading || items.length === 0}
                className="w-full bg-rose-500 text-white py-3 rounded-full mt-6 hover:bg-rose-600 font-bold disabled:opacity-50"
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