"use client";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

const s = {
  cream: '#FAFAF8',
  greenDark: '#1A3A2A',
  greenMid: '#2D6A4F',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  text: '#1C1C1A',
  textMuted: '#5A5A56',
  border: 'rgba(26, 58, 42, 0.12)',
}

export default function Cart() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCartStore();
  const router = useRouter();

  return (
    <main style={{ minHeight: '100vh', background: s.cream, fontFamily: "'Vazirmatn', sans-serif", direction: 'rtl' }}>

      {/* Navbar */}
      <nav style={{
        background: 'white', borderBottom: `1px solid ${s.border}`,
        padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="/" style={{ fontSize: 26, fontWeight: 900, color: s.greenDark, textDecoration: 'none' }}>
          نوژ<span style={{ color: s.greenLight }}>ین</span>
        </a>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: s.text }}>سبد خرید</h1>
        <a href="/products" style={{ fontSize: 13, color: s.textMuted, textDecoration: 'none' }}>
          ادامه خرید ←
        </a>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        {items.length === 0 ? (
          /* سبد خالی */
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: s.greenDark, marginBottom: 8 }}>
              سبد خریدت خالیه!
            </h2>
            <p style={{ fontSize: 14, color: s.textMuted, marginBottom: 32 }}>
              برو محصولات رو ببین و اضافه کن
            </p>
            <button
              onClick={() => router.push('/products')}
              style={{
                background: s.greenDark, color: 'white', border: 'none',
                padding: '14px 36px', borderRadius: 50, fontSize: 14,
                fontWeight: 700, fontFamily: "'Vazirmatn', sans-serif", cursor: 'pointer',
              }}
            >
              رفتن به محصولات
            </button>
          </div>

        ) : (
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

            {/* لیست محصولات */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((item) => (
                <div key={item.id} style={{
                  background: 'white', borderRadius: 16,
                  border: `1px solid ${s.border}`, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  {/* تصویر */}
                  <div style={{
                    width: 72, height: 72, background: s.greenPale,
                    borderRadius: 12, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
                  }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 28 }}>📦</span>
                    )}
                  </div>

                  {/* اطلاعات */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: s.text, marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: s.greenMid }}>
                      {item.price.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>

                  {/* کنترل تعداد */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
                        border: `1px solid ${s.border}`, background: 'white',
                        fontSize: 18, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        color: s.greenDark, fontFamily: "'Vazirmatn', sans-serif",
                      }}
                    >−</button>
                    <span style={{ fontSize: 15, fontWeight: 700, color: s.text, minWidth: 20, textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
                        border: 'none', background: s.greenDark,
                        fontSize: 18, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontFamily: "'Vazirmatn', sans-serif",
                      }}
                    >+</button>
                  </div>

                  {/* جمع این آیتم */}
                  <div style={{ fontSize: 14, fontWeight: 700, color: s.text, minWidth: 100, textAlign: 'left' }}>
                    {(item.price * item.quantity).toLocaleString('fa-IR')}
                  </div>

                  {/* حذف */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none', border: 'none', color: s.textMuted,
                      fontSize: 18, cursor: 'pointer', padding: 4,
                    }}
                  >✕</button>
                </div>
              ))}

              <button
                onClick={clearCart}
                style={{
                  background: 'none', border: 'none', color: s.textMuted,
                  fontSize: 12, cursor: 'pointer', textAlign: 'right',
                  fontFamily: "'Vazirmatn', sans-serif", padding: '4px 0',
                }}
              >
                حذف همه
              </button>
            </div>

            {/* خلاصه سفارش */}
            <div style={{ width: 280, flexShrink: 0 }}>
              <div style={{
                background: 'white', borderRadius: 20,
                border: `1px solid ${s.border}`, padding: 24,
                position: 'sticky', top: 24,
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: s.text, marginBottom: 20 }}>
                  خلاصه سفارش
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13, color: s.textMuted }}>
                  <span>{items.reduce((sum, i) => sum + i.quantity, 0)} عدد محصول</span>
                  <span>تعداد</span>
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  borderTop: `1px solid ${s.border}`, paddingTop: 16, marginTop: 8,
                  fontSize: 16, fontWeight: 900, color: s.greenDark,
                }}>
                  <span>{totalPrice().toLocaleString('fa-IR')} تومان</span>
                  <span>مبلغ کل</span>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  style={{
                    width: '100%', background: s.greenDark, color: 'white',
                    border: 'none', borderRadius: 50, padding: '14px',
                    fontSize: 14, fontWeight: 700, marginTop: 20,
                    fontFamily: "'Vazirmatn', sans-serif", cursor: 'pointer',
                  }}
                >
                  ادامه و پرداخت
                </button>

                <a href="/products" style={{
                  display: 'block', textAlign: 'center', marginTop: 12,
                  fontSize: 13, color: s.textMuted, textDecoration: 'none',
                }}>
                  ← ادامه خرید
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}