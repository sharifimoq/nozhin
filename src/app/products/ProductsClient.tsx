"use client";
import { useCartStore } from "@/store/cartStore";

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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-50 hover:shadow-md transition-all">
      <div className="bg-rose-50 rounded-t-2xl p-6 flex items-center justify-center">
        <img
          src={product.image || "https://placehold.co/200x200?text=Product"}
          alt={product.name}
          className="w-32 h-32 object-contain"
        />
      </div>
      <div className="p-5">
        <span className="text-xs bg-rose-100 text-rose-500 px-2 py-1 rounded-full">
          {product.category}
        </span>
        <h3 className="font-bold text-gray-800 mt-2 mb-1">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-800">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            })}
            className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-600"
          >
            افزودن به سبد
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
    <main className="min-h-screen bg-white" dir="rtl">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-rose-500">نوژین</a>
          <nav className="flex gap-6 text-sm text-gray-600">
            <a href="/products" className="text-rose-500 font-bold">محصولات</a>
            <a href="/quiz" className="hover:text-rose-500">روتین من</a>
          </nav>
          <a href="/cart" className="relative bg-rose-500 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-600">
            🛒 سبد خرید
            {totalItems() > 0 && (
              <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">💊 مکمل‌ها</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplementProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">🧴 محصولات پوستی</h2>
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
