import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات",
  description: "مکمل‌های سلامت، محصولات پوستی و مکمل‌های ورزشی معتبر. انتخاب شخصی‌سازی‌شده بر اساس روتین شما.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
