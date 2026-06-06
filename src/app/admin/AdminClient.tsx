"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
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
    category: "مکمل",
    stock: "",
    image: "",
  });

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.stock) {
      alert("نام، قیمت و موجودی رو پر کن");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      }),
    });

    if (res.ok) {
      setShowForm(false);
      setForm({ name: "", description: "", price: "", category: "مکمل", stock: "", image: "" });
      router.refresh();
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("مطمئنی؟")) return;

    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-rose-500">پنل ادمین نوژین</h1>
          <a href="/" className="text-sm text-gray-500 hover:text-rose-500">برگشت به سایت</a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* آمار */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-rose-500">{stats.users}</div>
            <div className="text-gray-400 text-sm mt-1">کاربر</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-rose-500">{stats.products}</div>
            <div className="text-gray-400 text-sm mt-1">محصول</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-rose-500">{stats.routines}</div>
            <div className="text-gray-400 text-sm mt-1">روتین ساخته شده</div>
          </div>
        </div>

        {/* محصولات */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-800 text-lg">محصولات</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-600"
            >
              + محصول جدید
            </button>
          </div>

          {/* فرم افزودن محصول */}
          {showForm && (
            <div className="bg-rose-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-700 mb-4">افزودن محصول جدید</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">نام محصول</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-2 border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">دسته‌بندی</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border-2 border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-400"
                  >
                    <option value="مکمل">مکمل</option>
                    <option value="پوستی">پوستی</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">قیمت (تومان)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border-2 border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">موجودی</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full border-2 border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">توضیحات</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border-2 border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">لینک تصویر</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full border-2 border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:border-rose-400"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 disabled:opacity-50"
                >
                  {loading ? "در حال ذخیره..." : "ذخیره"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-300"
                >
                  انصراف
                </button>
              </div>
            </div>
          )}

          {/* لیست محصولات */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="text-right py-3">نام</th>
                  <th className="text-right py-3">دسته</th>
                  <th className="text-right py-3">قیمت</th>
                  <th className="text-right py-3">موجودی</th>
                  <th className="text-right py-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-rose-50">
                    <td className="py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="py-3 text-gray-500">{product.category}</td>
                    <td className="py-3 text-gray-500">{product.price.toLocaleString("fa-IR")}</td>
                    <td className="py-3 text-gray-500">{product.stock}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-600 text-xs"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}