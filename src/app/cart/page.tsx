"use client";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCartStore();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-rose-50" dir="rtl">
      {/* هدر */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-rose-500">نوژین</a>
          <h1 className="text-lg font-bold text-gray-700">سبد خرید</h1>
          <a href="/products" className="text-sm text-gray-500 hover:text-rose-500">ادامه خرید</a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          /* سبد خالیه */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">سبد خریدت خالیه!</h2>
            <p className="text-gray-400 mb-6">برو محصولات رو ببین و اضافه کن</p>
            <button
              onClick={() => router.push("/products")}
              className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600"
            >
              رفتن به محصولات
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* لیست محصولات */}
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                  <img
                    src={item.image || "https://placehold.co/80x80?text=Product"}
                    alt={item.name}
                    className="w-20 h-20 object-contain bg-rose-50 rounded-xl p-2"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-rose-500 font-bold mt-1">
                      {item.price.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>

                  {/* کنترل تعداد */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 font-bold hover:bg-rose-200"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 font-bold hover:bg-rose-200"
                    >
                      +
                    </button>
                  </div>

                  {/* حذف */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 text-xl"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* خالی کردن سبد */}
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-red-400 text-right"
              >
                حذف همه
              </button>
            </div>

            {/* خلاصه سفارش */}
            <div className="lg:w-72">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-bold text-gray-800 mb-4">خلاصه سفارش</h2>
                <div className="flex justify-between text-gray-500 mb-2">
                  <span>تعداد محصولات</span>
                  <span>{items.reduce((s, i) => s + i.quantity, 0)} عدد</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-4 mt-4">
                  <span>مبلغ کل</span>
                  <span>{totalPrice().toLocaleString("fa-IR")} تومان</span>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-rose-500 text-white py-3 rounded-full mt-6 hover:bg-rose-600 font-bold"
                >
                  ادامه و پرداخت
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}