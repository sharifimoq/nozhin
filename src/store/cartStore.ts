import { create } from "zustand";

// تعریف نوع هر آیتم توی سبد خرید
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

// تعریف نوع کل سبد خرید و عملیات‌هاش
type CartStore = {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
};

// ساخت store با Zustand
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  // اضافه کردن محصول — اگه قبلاً بود، تعدادش رو زیاد کن
  addItem: (product) => {
    const existing = get().items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }
  },

  // حذف کامل محصول از سبد
  removeItem: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),

  // زیاد کردن تعداد
  increaseQuantity: (id) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }),

  // کم کردن تعداد — اگه ۱ بود، حذف کن
  decreaseQuantity: (id) => {
    const item = get().items.find((i) => i.id === id);
    if (item?.quantity === 1) {
      get().removeItem(id);
    } else {
      set({
        items: get().items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      });
    }
  },

  // خالی کردن سبد
  clearCart: () => set({ items: [] }),

  // محاسبه قیمت کل
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  // تعداد کل آیتم‌ها
  totalItems: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}));