import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// فونت سریف برای عناوین — لوکس و کلاسیک
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// فونت سنس برای متن — خوانا و مدرن
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "نوژین — روتین شخصی شما",
  description: "فروشگاه مکمل و محصولات پوستی با شخصی‌سازی هوش مصنوعی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F3EC]">
        {children}
      </body>
    </html>
  );
}