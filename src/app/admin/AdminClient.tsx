"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ToastContainer, { showToast } from "@/components/Toast";

const s = {
  cream: '#FAFAF8',
  greenDark: '#1A3A2A',
  greenMid: '#2D6A4F',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  text: '#1C1C1A',
  textMuted: '#5A5A56',
  border: 'rgba(26, 58, 42, 0.12)',
  red: '#c0392b',
  redBg: '#fef2f2',
}

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
};

type OrderItem = { id: string; name: string; price: number; quantity: number };
type Order = {
  id: string; name: string; email: string; mobile: string;
  address: string; total: number; status: string; refId: string | null;
  createdAt: Date; items: OrderItem[];
};
type UserRow = { id: string; name: string | null; email: string; createdAt: Date };
type Coupon = { id: string; code: string; discount: number; type: string; maxUses: number; usedCount: number; active: boolean };
type Stats = { users: number; routines: number; products: number; orders: number; revenue: number };

const emptyForm = { name: "", description: "", price: "", category: "supplement", stock: "", imageUrl: "" };
const emptyCouponForm = { code: "", discount: "", type: "percent", maxUses: "100" };

const categoryLabels: Record<string, string> = {
  skincare: "مراقبت پوست", supplement: "مکمل", sport: "ورزشی",
  پوستی: "مراقبت پوست", مکمل: "مکمل", ورزشی: "ورزشی",
};

export default function AdminClient({ products, orders, users, coupons, stats }: {
  products: Product[]; orders: Order[]; users: UserRow[]; coupons: Coupon[]; stats: Stats;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<'products' | 'orders' | 'users' | 'coupons'>('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [couponForm, setCouponForm] = useState(emptyCouponForm);
  const [couponSaving, setCouponSaving] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);

  const inputStyle = {
    width: "100%", border: `1px solid ${s.border}`, borderRadius: 10,
    padding: "9px 12px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif",
    outline: "none", background: "white", color: s.text,
  };

  const handleAdd = async () => {
    if (!addForm.name || !addForm.price) { showToast("نام و قیمت الزامی است", "error"); return; }
    setSaving(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...addForm, price: parseFloat(addForm.price), stock: parseInt(addForm.stock) || 0, imageUrl: addForm.imageUrl || null }),
    });
    if (res.ok) { setShowAddForm(false); setAddForm(emptyForm); router.refresh(); showToast("محصول اضافه شد"); }
    else showToast("خطا در ذخیره محصول", "error");
    setSaving(false);
  };

  const startEdit = (p: Product) => {
    setEditId(p.id);
    setEditForm({ name: p.name, description: p.description, price: String(p.price), category: p.category, stock: String(p.stock), imageUrl: p.imageUrl ?? "" });
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm, price: parseFloat(editForm.price), stock: parseInt(editForm.stock) || 0, imageUrl: editForm.imageUrl || null }),
    });
    if (res.ok) { setEditId(null); router.refresh(); showToast("تغییرات ذخیره شد"); }
    else showToast("خطا در ویرایش", "error");
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("مطمئنی؟")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
    showToast("محصول حذف شد");
  };

  const handleAddCoupon = async () => {
    if (!couponForm.code || !couponForm.discount) { showToast("کد و مقدار تخفیف الزامی است", "error"); return; }
    setCouponSaving(true);
    const res = await fetch("/api/coupon", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(couponForm),
    });
    if (res.ok) { setCouponForm(emptyCouponForm); setShowCouponForm(false); router.refresh(); showToast("کد تخفیف ساخته شد"); }
    else showToast("خطا در ساخت کوپن", "error");
    setCouponSaving(false);
  };

  const handleDeactivateCoupon = async (id: string) => {
    await fetch("/api/coupon", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
    showToast("کوپن غیرفعال شد");
  };

  const handleOrderStatus = async (id: string, status: string) => {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  };

  const FormField = ({ label, value, onChange, type = "text", placeholder = "" }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
  }) => (
    <div>
      <label style={{ fontSize: 11, color: s.textMuted, display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </div>
  );

  const CategorySelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <div>
      <label style={{ fontSize: 11, color: s.textMuted, display: "block", marginBottom: 4, fontWeight: 600 }}>دسته‌بندی</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle}>
        <option value="supplement">مکمل</option>
        <option value="skincare">مراقبت پوست</option>
        <option value="sport">ورزشی</option>
      </select>
    </div>
  );

  const tabBtn = (label: string, key: 'products' | 'orders' | 'users' | 'coupons', count: number) => (
    <button onClick={() => setTab(key)} style={{
      padding: "10px 24px", borderRadius: 50, fontSize: 13, fontWeight: 600,
      fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer", border: "none",
      background: tab === key ? s.greenDark : "transparent",
      color: tab === key ? "white" : s.textMuted,
    }}>
      {label} <span style={{ opacity: 0.7, fontSize: 11 }}>({count})</span>
    </button>
  );

  return (
    <main style={{ minHeight: "100vh", background: s.cream, fontFamily: "'Vazirmatn', sans-serif", direction: "rtl" }}>
      <ToastContainer />
      <header style={{ background: "white", borderBottom: `1px solid ${s.border}`, padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: s.greenDark }}>پنل مدیریت نوژین</h1>
        <a href="/" style={{ fontSize: 13, color: s.textMuted, textDecoration: "none" }}>← برگشت به سایت</a>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px" }}>

        {/* آمار */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { label: "کاربر", value: stats.users, icon: "👤" },
            { label: "محصول", value: stats.products, icon: "📦" },
            { label: "سفارش", value: stats.orders, icon: "🛒" },
            { label: "روتین", value: stats.routines, icon: "🌿" },
            { label: "درآمد (تومان)", value: stats.revenue.toLocaleString("fa-IR"), icon: "💰" },
          ].map((item) => (
            <div key={item.label} style={{ background: "white", borderRadius: 16, padding: "16px 20px", border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: s.greenPale, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: s.greenDark, lineHeight: 1 }}>{item.value}</div>
                <div style={{ fontSize: 11, color: s.textMuted, marginTop: 3 }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* تب‌ها */}
        <div className="admin-tabs" style={{ display: "flex", gap: 8, marginBottom: 20, background: "white", padding: "6px", borderRadius: 50, border: `1px solid ${s.border}`, width: "fit-content", flexWrap: "wrap" }}>
          {tabBtn("محصولات", "products", stats.products)}
          {tabBtn("سفارشات", "orders", stats.orders)}
          {tabBtn("کاربران", "users", stats.users)}
          {tabBtn("کدهای تخفیف", "coupons", coupons.length)}
        </div>

        {/* ─── تب محصولات ─── */}
        {tab === "products" && (
          <div style={{ background: "white", borderRadius: 20, border: `1px solid ${s.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${s.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.greenDark }}>مدیریت محصولات</h2>
              <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="جستجو محصول..."
                  style={{ width: "100%", padding: "8px 36px 8px 12px", border: `1px solid ${s.border}`, borderRadius: 50, fontSize: 12, fontFamily: "'Vazirmatn', sans-serif", outline: "none", boxSizing: "border-box" as const }}
                />
              </div>
              <button onClick={() => { setShowAddForm(!showAddForm); setEditId(null); }} style={{
                background: s.greenDark, color: "white", border: "none", borderRadius: 50,
                padding: "9px 22px", fontSize: 13, fontWeight: 600, fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer",
              }}>
                {showAddForm ? "انصراف" : "+ محصول جدید"}
              </button>
            </div>

            {showAddForm && (
              <div style={{ padding: "20px 24px", background: s.greenPale, borderBottom: `1px solid ${s.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <FormField label="نام محصول" value={addForm.name} onChange={(v) => setAddForm({ ...addForm, name: v })} />
                  <FormField label="قیمت (تومان)" value={addForm.price} onChange={(v) => setAddForm({ ...addForm, price: v })} type="number" />
                  <FormField label="موجودی" value={addForm.stock} onChange={(v) => setAddForm({ ...addForm, stock: v })} type="number" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 12 }}>
                  <CategorySelect value={addForm.category} onChange={(v) => setAddForm({ ...addForm, category: v })} />
                  <FormField label="توضیحات" value={addForm.description} onChange={(v) => setAddForm({ ...addForm, description: v })} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <FormField label="لینک تصویر (اختیاری)" value={addForm.imageUrl} onChange={(v) => setAddForm({ ...addForm, imageUrl: v })} placeholder="https://..." />
                </div>
                <button onClick={handleAdd} disabled={saving} style={{
                  background: s.greenDark, color: "white", border: "none", borderRadius: 50,
                  padding: "10px 28px", fontSize: 13, fontWeight: 700,
                  fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer", opacity: saving ? 0.6 : 1,
                }}>
                  {saving ? "در حال ذخیره..." : "ذخیره محصول"}
                </button>
              </div>
            )}

            <div className="admin-table-wrap"><table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["نام محصول", "دسته", "قیمت (تومان)", "موجودی", "عملیات"].map((h) => (
                    <th key={h} style={{ textAlign: "right", padding: "12px 16px", color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.filter((p) => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()) || (categoryLabels[p.category] ?? p.category).includes(productSearch)).map((p) => (
                  <>
                    <tr key={p.id} style={{ borderBottom: `1px solid ${s.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: s.text }}>{p.name}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: s.greenPale, color: s.greenMid, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 50 }}>
                          {categoryLabels[p.category] ?? p.category}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: s.greenMid, fontWeight: 700 }}>{p.price.toLocaleString("fa-IR")}</td>
                      <td style={{ padding: "12px 16px", color: p.stock < 5 ? s.red : s.textMuted, fontWeight: p.stock < 5 ? 700 : 400 }}>
                        {p.stock} {p.stock < 5 && <span style={{ fontSize: 10 }}>⚠️</span>}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 12 }}>
                          <button onClick={() => editId === p.id ? setEditId(null) : startEdit(p)} style={{
                            color: s.greenMid, background: "none", border: "none", fontSize: 12,
                            cursor: "pointer", fontFamily: "'Vazirmatn', sans-serif", fontWeight: 600,
                          }}>
                            {editId === p.id ? "لغو" : "ویرایش"}
                          </button>
                          <button onClick={() => handleDelete(p.id)} style={{
                            color: s.red, background: "none", border: "none", fontSize: 12,
                            cursor: "pointer", fontFamily: "'Vazirmatn', sans-serif",
                          }}>
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                    {editId === p.id && (
                      <tr key={`edit-${p.id}`}>
                        <td colSpan={5} style={{ padding: 0 }}>
                          <div style={{ background: "#FFFBF0", borderBottom: `2px solid ${s.greenLight}`, padding: "16px 24px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                              <FormField label="نام محصول" value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} />
                              <FormField label="قیمت" value={editForm.price} onChange={(v) => setEditForm({ ...editForm, price: v })} type="number" />
                              <FormField label="موجودی" value={editForm.stock} onChange={(v) => setEditForm({ ...editForm, stock: v })} type="number" />
                              <CategorySelect value={editForm.category} onChange={(v) => setEditForm({ ...editForm, category: v })} />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                              <FormField label="توضیحات" value={editForm.description} onChange={(v) => setEditForm({ ...editForm, description: v })} />
                              <FormField label="لینک تصویر" value={editForm.imageUrl} onChange={(v) => setEditForm({ ...editForm, imageUrl: v })} placeholder="https://..." />
                            </div>
                            <button onClick={() => handleEdit(p.id)} disabled={saving} style={{
                              background: s.greenDark, color: "white", border: "none", borderRadius: 50,
                              padding: "9px 24px", fontSize: 13, fontWeight: 700,
                              fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer", opacity: saving ? 0.6 : 1,
                            }}>
                              {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table></div>
            {products.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: s.textMuted, fontSize: 14 }}>هنوز محصولی اضافه نشده</div>
            )}
          </div>
        )}

        {/* ─── تب سفارشات ─── */}
        {tab === "orders" && (
          <div style={{ background: "white", borderRadius: 20, border: `1px solid ${s.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${s.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.greenDark }}>سفارشات</h2>
              <div style={{ position: "relative", maxWidth: 260 }}>
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="جستجو نام یا ایمیل..."
                  style={{ width: "100%", padding: "8px 36px 8px 12px", border: `1px solid ${s.border}`, borderRadius: 50, fontSize: 12, fontFamily: "'Vazirmatn', sans-serif", outline: "none", boxSizing: "border-box" as const }}
                />
              </div>
            </div>
            <div className="admin-table-wrap"><table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["نام مشتری", "موبایل", "مبلغ (تومان)", "وضعیت", "تاریخ", "کد پیگیری"].map((h) => (
                    <th key={h} style={{ textAlign: "right", padding: "12px 16px", color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.filter((o) => !orderSearch || o.name.includes(orderSearch) || o.email.includes(orderSearch) || o.mobile.includes(orderSearch)).map((o) => (
                  <tr key={o.id} style={{ borderBottom: `1px solid ${s.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: s.text }}>
                      {o.name}
                      <div style={{ fontSize: 11, color: s.textMuted, fontWeight: 400 }}>{o.email}</div>
                    </td>
                    <td style={{ padding: "12px 16px", color: s.textMuted }}>{o.mobile}</td>
                    <td style={{ padding: "12px 16px", color: s.greenMid, fontWeight: 700 }}>{o.total.toLocaleString("fa-IR")}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <select
                        value={o.status}
                        onChange={(e) => handleOrderStatus(o.id, e.target.value)}
                        style={{
                          fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 50,
                          border: "none", cursor: "pointer", fontFamily: "'Vazirmatn', sans-serif",
                          background: o.status === "paid" ? s.greenPale : o.status === "shipped" ? "#EFF6FF" : o.status === "delivered" ? "#F0FDF4" : "#FEF3C7",
                          color: o.status === "paid" ? s.greenMid : o.status === "shipped" ? "#1D4ED8" : o.status === "delivered" ? "#166534" : "#92400E",
                        }}
                      >
                        <option value="pending">در انتظار</option>
                        <option value="paid">پرداخت‌شده</option>
                        <option value="shipped">ارسال‌شده</option>
                        <option value="delivered">تحویل‌شده</option>
                      </select>
                    </td>
                    <td style={{ padding: "12px 16px", color: s.textMuted, fontSize: 12 }}>
                      {new Date(o.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td style={{ padding: "12px 16px", color: s.textMuted, fontSize: 11, fontFamily: "monospace" }}>
                      {o.refId ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
            {orders.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: s.textMuted, fontSize: 14 }}>هنوز سفارشی ثبت نشده</div>
            )}
          </div>
        )}

        {/* ─── تب کاربران ─── */}
        {tab === "users" && (
          <div style={{ background: "white", borderRadius: 20, border: `1px solid ${s.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${s.border}` }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.greenDark }}>کاربران ثبت‌نام‌شده ({users.length})</h2>
            </div>
            <div className="admin-table-wrap"><table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["نام", "ایمیل", "تاریخ عضویت"].map((h) => (
                    <th key={h} style={{ textAlign: "right", padding: "12px 16px", color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: `1px solid ${s.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: s.text }}>{u.name ?? "—"}</td>
                    <td style={{ padding: "12px 16px", color: s.textMuted }}>{u.email}</td>
                    <td style={{ padding: "12px 16px", color: s.textMuted, fontSize: 12 }}>
                      {new Date(u.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
            {users.length === 0 && <div style={{ textAlign: "center", padding: "48px 0", color: s.textMuted, fontSize: 14 }}>هنوز کاربری ثبت‌نام نکرده</div>}
          </div>
        )}

        {/* ─── تب کوپن‌ها ─── */}
        {tab === "coupons" && (
          <div style={{ background: "white", borderRadius: 20, border: `1px solid ${s.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${s.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.greenDark }}>کدهای تخفیف</h2>
              <button onClick={() => setShowCouponForm(!showCouponForm)} style={{
                background: s.greenDark, color: "white", border: "none", borderRadius: 50,
                padding: "9px 22px", fontSize: 13, fontWeight: 600, fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer",
              }}>
                {showCouponForm ? "انصراف" : "+ کد جدید"}
              </button>
            </div>

            {showCouponForm && (
              <div style={{ padding: "20px 24px", background: s.greenPale, borderBottom: `1px solid ${s.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: s.textMuted, display: "block", marginBottom: 4, fontWeight: 600 }}>کد تخفیف</label>
                    <input value={couponForm.code} onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                      placeholder="مثلاً NOZHIN20" style={{ width: "100%", border: `1px solid ${s.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: s.textMuted, display: "block", marginBottom: 4, fontWeight: 600 }}>مقدار تخفیف</label>
                    <input type="number" value={couponForm.discount} onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })}
                      placeholder="مثلاً 20" style={{ width: "100%", border: `1px solid ${s.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: s.textMuted, display: "block", marginBottom: 4, fontWeight: 600 }}>نوع</label>
                    <select value={couponForm.type} onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })}
                      style={{ width: "100%", border: `1px solid ${s.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}>
                      <option value="percent">درصدی</option>
                      <option value="fixed">مبلغ ثابت (تومان)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: s.textMuted, display: "block", marginBottom: 4, fontWeight: 600 }}>حداکثر استفاده</label>
                    <input type="number" value={couponForm.maxUses} onChange={(e) => setCouponForm({ ...couponForm, maxUses: e.target.value })}
                      style={{ width: "100%", border: `1px solid ${s.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }} />
                  </div>
                </div>
                <button onClick={handleAddCoupon} disabled={couponSaving} style={{
                  background: s.greenDark, color: "white", border: "none", borderRadius: 50,
                  padding: "10px 28px", fontSize: 13, fontWeight: 700, fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer", opacity: couponSaving ? 0.6 : 1,
                }}>
                  {couponSaving ? "در حال ذخیره..." : "ذخیره کد"}
                </button>
              </div>
            )}

            <div className="admin-table-wrap"><table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["کد", "تخفیف", "استفاده‌شده", "وضعیت", "عملیات"].map((h) => (
                    <th key={h} style={{ textAlign: "right", padding: "12px 16px", color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${s.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: s.greenDark, fontFamily: "monospace", letterSpacing: 1 }}>{c.code}</td>
                    <td style={{ padding: "12px 16px", color: s.greenMid, fontWeight: 700 }}>
                      {c.discount}{c.type === "percent" ? "٪" : " تومان"}
                    </td>
                    <td style={{ padding: "12px 16px", color: s.textMuted }}>{c.usedCount} از {c.maxUses}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 50,
                        background: c.active ? s.greenPale : "#fef2f2",
                        color: c.active ? s.greenMid : s.red,
                      }}>
                        {c.active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {c.active && (
                        <button onClick={() => handleDeactivateCoupon(c.id)} style={{
                          color: s.red, background: "none", border: "none", fontSize: 12,
                          cursor: "pointer", fontFamily: "'Vazirmatn', sans-serif",
                        }}>غیرفعال کن</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
            {coupons.length === 0 && <div style={{ textAlign: "center", padding: "48px 0", color: s.textMuted, fontSize: 14 }}>هنوز کد تخفیفی ساخته نشده</div>}
          </div>
        )}

      </div>
    </main>
  );
}
