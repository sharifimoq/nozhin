"use client";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
  stock: number;
};

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: "white", borderRadius: "20px", border: "0.5px solid #E8E4DC", overflow: "hidden", transition: "transform 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ background: "var(--cream)", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={product.image || "https://placehold.co/160x160?text="}
          alt={product.name}
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ background: "var(--sage-light)", color: "var(--sage)", fontSize: "11px", padding: "4px 12px", borderRadius: "100px", fontWeight: "500" }}>
            {product.category}
          </span>
          {product.stock < 10 && (
            <span style={{ fontSize: "11px", color: "var(--gold)" }}>موجودی محدود</span>
          )}
        </div>
        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "18px", color: "var(--dark)", marginBottom: "6px" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "13px", color: "var(--light)", lineHeight: "1.6", marginBottom: "16px", fontWeight: "300" }}>
          {product.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "15px", fontWeight: "500", color: "var(--dark)" }}>
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
          <button
            onClick={handleAdd}
            style={{
              background: added ? "var(--sage-light)" : "var(--sage)",
              color: added ? "var(--sage)" : "white",
              border: "none",
              padding: "8px 18px",
              borderRadius: "100px",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {added ? "✓ اضافه شد" : "افزودن"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const skinProducts = products.filter((p) => p.category === "پوستی");
  const supplementProducts = products.filter((p) => p.category === "مکمل");
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }} dir="rtl">

      {/* هدر */}
      <header style={{ background: "var(--cream)", borderBottom: "0.5px solid #E8E4DC" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{ background: "var(--sage)", borderRadius: "10px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontFamily: "var(--font-playfair)", fontSize: "16px" }}>ن</span>
            </div>
            <a href="/" style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", textDecoration: "none" }}>نوژین</a>
          </div>

          <nav className="flex gap-8 text-sm" style={{ color: "var(--mid)" }}>
            <a href="/products" style={{ color: "var(--sage)", fontWeight: "500" }}>محصولات</a>
            <a href="/quiz" className="hover:text-black transition-colors">روتین من</a>
            <a href="/profile" className="hover:text-black transition-colors">پروفایل</a>
          </nav>

          <a href="/cart" style={{ background: "var(--sage)", color: "white", padding: "8px 20px", borderRadius: "100px", fontSize: "13px", textDecoration: "none", position: "relative" }}>
            سبد خرید
            {totalItems() > 0 && (
              <span style={{ position: "absolute", top: "-6px", left: "-6px", background: "var(--gold)", color: "white", fontSize: "10px", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {totalItems()}
              </span>
            )}
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* عنوان صفحه */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "40px", color: "var(--dark)", marginBottom: "12px" }}>
            محصولات
          </h1>
          <p style={{ fontSize: "15px", color: "var(--light)", fontWeight: "300" }}>
            انتخاب شده برای سلامت و زیبایی شما
          </p>
        </div>

        {/* مکمل‌ها */}
        <section style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "26px", color: "var(--dark)" }}>مکمل‌ها</h2>
            <div style={{ height: "0.5px", flex: 1, background: "#E8E4DC" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplementProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* محصولات پوستی */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "26px", color: "var(--dark)" }}>محصولات پوستی</h2>
            <div style={{ height: "0.5px", flex: 1, background: "#E8E4DC" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skinProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}