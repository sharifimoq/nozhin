"use client";
import { useState } from "react";
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
type Stats = { users: number; routines: number; products: number; orders: number; revenue: number };

const emptyForm = { name: "", description: "", price: "", category: "supplement", stock: "", imageUrl: "" };

const categoryLabels: Record<string, string> = {
  skincare: "مراقبت پوست", supplement: "مکمل", sport: "ورزشی",
  پوستی: "مراقبت پوست", مکمل: "مکمل", ورزشی: "ورزشی",
};

export default function AdminClient({ products, orders, stats }: { products: Product[]; orders: Order[]; stats: Stats }) {
  const router = useRouter();
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const inputStyle = {
    width: "100%", border: `1px solid ${s.border}`, borderRadius: 10,
    padding: "9px 12px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif",
    outline: "none", background: "white", color: s.text,
  };

  const handleAdd = async () => {
    if (!addForm.name || !addForm.price) { alert("نام و قیمت الزامی است"); return; }
    setSaving(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...addForm, price: parseFloat(addForm.price), stock: parseInt(addForm.stock) || 0, imageUrl: addForm.imageUrl || null }),
    });
    if (res.ok) { setShowAddForm(false); setAddForm(emptyForm); router.refresh(); }
    else alert("خطا در ذخیره محصول");
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
    if (res.ok) { setEditId(null); router.refresh(); }
    else alert("خطا در ویرایش");
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("مطمئنی؟")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
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

  const tabBtn = (label: string, key: 'products' | 'orders', count: number) => (
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
        <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "white", padding: "6px", borderRadius: 50, border: `1px solid ${s.border}`, width: "fit-content" }}>
          {tabBtn("محصولات", "products", stats.products)}
          {tabBtn("سفارشات", "orders", stats.orders)}
        </div>

        {/* ─── تب محصولات ─── */}
        {tab === "products" && (
          <div style={{ background: "white", borderRadius: 20, border: `1px solid ${s.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${s.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.greenDark }}>مدیریت محصولات</h2>
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

            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["نام محصول", "دسته", "قیمت (تومان)", "موجودی", "عملیات"].map((h) => (
                    <th key={h} style={{ textAlign: "right", padding: "12px 16px", color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
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
            </table>
            {products.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: s.textMuted, fontSize: 14 }}>هنوز محصولی اضافه نشده</div>
            )}
          </div>
        )}

        {/* ─── تب سفارشات ─── */}
        {tab === "orders" && (
          <div style={{ background: "white", borderRadius: 20, border: `1px solid ${s.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${s.border}` }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: s.greenDark }}>سفارشات</h2>
            </div>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["نام مشتری", "موبایل", "مبلغ (تومان)", "وضعیت", "تاریخ", "کد پیگیری"].map((h) => (
                    <th key={h} style={{ textAlign: "right", padding: "12px 16px", color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: `1px solid ${s.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: s.text }}>
                      {o.name}
                      <div style={{ fontSize: 11, color: s.textMuted, fontWeight: 400 }}>{o.email}</div>
                    </td>
                    <td style={{ padding: "12px 16px", color: s.textMuted }}>{o.mobile}</td>
                    <td style={{ padding: "12px 16px", color: s.greenMid, fontWeight: 700 }}>{o.total.toLocaleString("fa-IR")}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 50,
                        background: o.status === "paid" ? s.greenPale : "#FEF3C7",
                        color: o.status === "paid" ? s.greenMid : "#92400E",
                      }}>
                        {o.status === "paid" ? "پرداخت‌شده" : "در انتظار"}
                      </span>
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
            </table>
            {orders.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: s.textMuted, fontSize: 14 }}>هنوز سفارشی ثبت نشده</div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
