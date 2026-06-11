import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { s, font } from "@/lib/style";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { email: session.user.email },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ minHeight: "100vh", background: s.cream, fontFamily: font, direction: "rtl" }}>

      <nav style={{
        background: "white", borderBottom: `1px solid ${s.border}`,
        padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ fontSize: 26, fontWeight: 900, color: s.greenDark, textDecoration: "none" }}>
          نوژ<span style={{ color: s.greenLight }}>ین</span>
        </Link>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/profile" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>پروفایل</Link>
          <Link href="/orders" style={{ fontSize: 14, color: s.greenDark, fontWeight: 600, textDecoration: "none" }}>سفارش‌ها</Link>
        </div>
        <Link href="/products" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>← ادامه خرید</Link>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>

        <h1 style={{ fontSize: 28, fontWeight: 900, color: s.greenDark, marginBottom: 8 }}>سفارش‌های من</h1>
        <p style={{ fontSize: 14, color: s.textMuted, marginBottom: 32 }}>{orders.length} سفارش ثبت‌شده</p>

        {orders.length === 0 ? (
          <div style={{
            background: "white", borderRadius: 20, border: `1px solid ${s.border}`,
            padding: "64px 32px", textAlign: "center",
          }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🛒</div>
            <p style={{ fontSize: 15, color: s.textMuted, marginBottom: 28 }}>هنوز سفارشی ثبت نکردی</p>
            <Link href="/products" style={{
              background: s.greenDark, color: "white", padding: "13px 32px",
              borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block",
            }}>
              شروع خرید
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {orders.map((order) => (
              <div key={order.id} style={{
                background: "white", borderRadius: 20,
                border: `1px solid ${s.border}`,
                overflow: "hidden",
              }}>
                {/* هدر سفارش */}
                <div style={{
                  padding: "16px 24px",
                  borderBottom: `1px solid ${s.border}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 50,
                      background:
                        order.status === "delivered" ? "#F0FDF4" :
                        order.status === "shipped"   ? "#EFF6FF" :
                        order.status === "paid"      ? s.greenPale : "#FEF3C7",
                      color:
                        order.status === "delivered" ? "#166534" :
                        order.status === "shipped"   ? "#1D4ED8" :
                        order.status === "paid"      ? s.greenMid : "#92400E",
                    }}>
                      {order.status === "delivered" ? "✓ تحویل داده شد" :
                       order.status === "shipped"   ? "🚚 در حال ارسال" :
                       order.status === "paid"      ? "✓ پرداخت‌شده" : "در انتظار"}
                    </span>
                    <span style={{ fontSize: 12, color: s.textMuted }}>
                      {new Date(order.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: s.greenDark }}>
                    {order.total.toLocaleString("fa-IR")} تومان
                  </div>
                </div>

                {/* آیتم‌های سفارش */}
                <div style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                    {order.items.map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: s.text, fontWeight: 600 }}>
                          {item.name}
                          <span style={{ color: s.textMuted, fontWeight: 400 }}> × {item.quantity}</span>
                        </span>
                        <span style={{ color: s.textMuted }}>
                          {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* آدرس و کد پیگیری */}
                  <div style={{ display: "flex", gap: 24, fontSize: 12, color: s.textMuted, paddingTop: 12, borderTop: `1px solid ${s.border}` }}>
                    {order.address && (
                      <span>📍 {order.address.length > 50 ? order.address.slice(0, 50) + "..." : order.address}</span>
                    )}
                    {order.refId && (
                      <span style={{ marginRight: "auto" }}>کد پیگیری: <span style={{ fontFamily: "monospace", color: s.greenMid }}>{order.refId}</span></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
