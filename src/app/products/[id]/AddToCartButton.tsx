"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

type Product = { id: string; name: string; price: number; imageUrl: string | null; stock: number };

const s = {
  greenDark: '#1A3A2A', greenLight: '#52B788',
};

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (product.stock === 0) {
    return (
      <button disabled style={{
        width: '100%', padding: '16px', borderRadius: 50, border: 'none',
        background: '#e5e7eb', color: '#9ca3af', fontSize: 15, fontWeight: 700,
        fontFamily: "'Vazirmatn', sans-serif", cursor: 'not-allowed',
      }}>
        ناموجود
      </button>
    );
  }

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      style={{
        width: '100%', padding: '16px', borderRadius: 50, border: 'none',
        background: added ? s.greenLight : s.greenDark,
        color: 'white', fontSize: 15, fontWeight: 700,
        fontFamily: "'Vazirmatn', sans-serif", cursor: 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {added ? '✓ به سبد اضافه شد' : 'افزودن به سبد خرید'}
    </button>
  );
}
