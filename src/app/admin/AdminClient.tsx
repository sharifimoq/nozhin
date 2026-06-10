"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
};

type Stats = {
  users: number;
  routines: number;
  products: number;
};

export default function AdminClient({
  products,
  stats,
}: {
  products: Product[];
  stats: Stats;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "supplement",
    stock: "",
    imageUrl: "",
  });

  const handleAdd = async () => {
    if (!form.name || !form.price) {
      alert("نام و قیمت الزامی است");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        stock: parseInt(form.stock) || 0,
        imageUrl: form.imageUrl || null,
      }),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({ name: "", description: "", price: "", category: "supplement", stock: "", imageUrl: "" });
      router.refresh();
    } else {
      alert("خطا در ذخیره محصول");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("مطمئنی؟")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const categoryLabels: Record<string, string> = {
    skincare: "مراقبت پوست",
    supplement: "مکمل",
    sport: "ورزشی",
    پوستی: "مراقبت پوست",
    مکمل: "مکمل",
    ورزشی: "ورزشی",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'Vazirmatn', sans-serif", direction: "rtl" }}>
      <header style={{ background: "white", borderBottom: "1px solid rgba(26,58,42,0.12)", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1A3A2A" }}>پنل ادمین نوژین</h1>
        <a href="/" style={{ fontSize: 13, color: "#5A5A56", textDecoration: "none" }}>برگشت به سایت</a>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px" }}>

        {/* آمار */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "کاربر", value: stats.users },
            { label: "محصول", value: stats.products },
            { label: "روتین ساخته‌شده", value: stats.routines },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", borderRadius: 16, padding: "24px", textAlign: "center", border: "1px solid rgba(26,58,42,0.12)" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#1A3A2A" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#5A5A56", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* محصولات */}
        <div style={{ background: "white", borderRadius: 20, border: "1px solid rgba(26,58,42,0.12)", padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A3A2A" }}>محصولات</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{ background: "#1A3A2A", color: "white", border: "none", borderRadius: 50, padding: "10px 24px", fontSize: 13, fontWeight: 600, fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer" }}
            >
              + محصول جدید
            </button>
          </div>

          {/* فرم */}
          {showForm && (
            <div style={{ background: "#D8F3DC", borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A3A2A", marginBottom: 16 }}>افزودن محصول جدید</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#2D6A4F", display: "block", marginBottom: 6 }}>نام محصول</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", border: "1px solid rgba(26,58,42,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#2D6A4F", display: "block", marginBottom: 6 }}>قیمت (تومان)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    style={{ width: "100%", border: "1px solid rgba(26,58,42,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#2D6A4F", display: "block", marginBottom: 6 }}>دسته‌بندی</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={{ width: "100%", border: "1px solid rgba(26,58,42,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}
                  >
                    <option value="supplement">مکمل</option>
                    <option value="skincare">مراقبت پوست</option>
                    <option value="sport">ورزشی</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#2D6A4F", display: "block", marginBottom: 6 }}>موجودی</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    style={{ width: "100%", border: "1px solid rgba(26,58,42,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}
                  />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: 12, color: "#2D6A4F", display: "block", marginBottom: 6 }}>توضیحات</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    style={{ width: "100%", border: "1px solid rgba(26,58,42,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}
                  />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: 12, color: "#2D6A4F", display: "block", marginBottom: 6 }}>لینک تصویر (اختیاری)</label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://..."
                    style={{ width: "100%", border: "1px solid rgba(26,58,42,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "'Vazirmatn', sans-serif", outline: "none" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  style={{ background: "#1A3A2A", color: "white", border: "none", borderRadius: 50, padding: "10px 28px", fontSize: 13, fontWeight: 700, fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer", opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? "در حال ذخیره..." : "ذخیره"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{ background: "rgba(26,58,42,0.1)", color: "#1A3A2A", border: "none", borderRadius: 50, padding: "10px 28px", fontSize: 13, fontFamily: "'Vazirmatn', sans-serif", cursor: "pointer" }}
                >
                  انصراف
                </button>
              </div>
            </div>
          )}

          {/* جدول */}
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(26,58,42,0.1)" }}>
                {["نام", "دسته", "قیمت", "موجودی", "عملیات"].map((h) => (
                  <th key={h} style={{ textAlign: "right", padding: "10px 8px", color: "#5A5A56", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid rgba(26,58,42,0.08)" }}>
                  <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1C1C1A" }}>{product.name}</td>
                  <td style={{ padding: "12px 8px", color: "#5A5A56" }}>{categoryLabels[product.category] ?? product.category}</td>
                  <td style={{ padding: "12px 8px", color: "#2D6A4F", fontWeight: 700 }}>{product.price.toLocaleString("fa-IR")}</td>
                  <td style={{ padding: "12px 8px", color: "#5A5A56" }}>{product.stock}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{ color: "#c0392b", background: "none", border: "none", fontSize: 12, cursor: "pointer", fontFamily: "'Vazirmatn', sans-serif" }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#5A5A56", fontSize: 14 }}>
              هنوز محصولی اضافه نشده
            </div>
          )}
        </div>
      </div>
    </main>
  );
}