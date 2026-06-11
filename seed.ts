import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { PrismaClient } from "./src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      // ─── مکمل‌ها ───────────────────────────────────────────────
      {
        name: "ویتامین C ۱۰۰۰ میلی‌گرم Nature Made",
        description: "تقویت سیستم ایمنی، آنتی‌اکسیدان قوی. ۱۰۰ عدد قرص جوشان. ساخت آمریکا.",
        price: 185000,
        category: "supplement",
        stock: 60,
        imageUrl: "https://images.iherb.com/l/NMD-00173-9.jpg",
      },
      {
        name: "امگا ۳ ۱۲۰۰ میلی‌گرم NOW Foods",
        description: "تقویت قلب، مغز و کاهش التهاب. روغن ماهی تصفیه‌شده. ۱۸۰ عدد سافت ژل.",
        price: 245000,
        category: "supplement",
        stock: 45,
        imageUrl: "https://images.iherb.com/l/NOW-01700-9.jpg",
      },
      {
        name: "ویتامین D3 + K2 2000 IU NOW Foods",
        description: "تقویت استخوان، سیستم ایمنی و خلق‌وخو. ترکیب D3 و K2 برای جذب بهتر. ۱۲۰ کپسول.",
        price: 210000,
        category: "supplement",
        stock: 50,
        imageUrl: "https://images.iherb.com/l/NOW-00369-9.jpg",
      },
      {
        name: "زینک ۵۰ میلی‌گرم NOW Foods",
        description: "تقویت سیستم ایمنی، پوست و مو. زینک گلوکونات با جذب بالا. ۲۵۰ قرص.",
        price: 165000,
        category: "supplement",
        stock: 70,
        imageUrl: "https://images.iherb.com/l/NOW-01522-9.jpg",
      },
      {
        name: "بیوتین ۱۰۰۰۰ میکروگرم NOW Foods",
        description: "تقویت مو، ناخن و پوست. فرمول زیست‌فراهم. ۱۲۰ کپسول. مناسب موهای ریزش‌دار.",
        price: 195000,
        category: "supplement",
        stock: 55,
        imageUrl: "https://images.iherb.com/l/NOW-00490-9.jpg",
      },
      {
        name: "منیزیم ۴۰۰ میلی‌گرم NOW Foods",
        description: "کاهش استرس، بهبود خواب و ریلکس عضلات. منیزیم اکسید. ۱۸۰ قرص.",
        price: 175000,
        category: "supplement",
        stock: 40,
        imageUrl: "https://images.iherb.com/l/NOW-01300-9.jpg",
      },
      {
        name: "مولتی ویتامین زنانه Optimum Nutrition",
        description: "فرمول کامل ۲۳ ویتامین و مینرال مخصوص خانم‌ها. آهن، فولیک اسید و کلسیم بالا. ۶۰ قرص.",
        price: 320000,
        category: "supplement",
        stock: 35,
        imageUrl: "https://images.iherb.com/l/OPN-00007-9.jpg",
      },
      {
        name: "مولتی ویتامین مردانه Optimum Nutrition",
        description: "فرمول کامل مخصوص آقایان. زینک، سلنیوم، ویتامین‌های گروه B. ۶۰ قرص.",
        price: 310000,
        category: "supplement",
        stock: 35,
        imageUrl: "https://images.iherb.com/l/OPN-00008-9.jpg",
      },
      {
        name: "کلاژن پپتید ۵۰۰۰ میلی‌گرم",
        description: "جوانسازی پوست، تقویت مفاصل و مو. هیدرولیز شده از منبع گاوی. ۳۰ ساشه.",
        price: 480000,
        category: "supplement",
        stock: 25,
        imageUrl: "https://images.iherb.com/l/NFS-00001-9.jpg",
      },

      // ─── پوستی ────────────────────────────────────────────────
      {
        name: "سرم ویتامین C 20% The Ordinary",
        description: "روشن‌کننده، ضدلک و ضدچروک. فرمول آسکوربیک اسید خالص. ۳۰ میلی‌لیتر.",
        price: 390000,
        category: "skincare",
        stock: 30,
        imageUrl: "https://images.iherb.com/l/TOC-02230-9.jpg",
      },
      {
        name: "ضدآفتاب SPF50+ Bioderma Photoderm",
        description: "محافظت UVA/UVB، مناسب پوست حساس. بافت سبک و غیرچرب. ۵۰ میلی‌لیتر. ساخت فرانسه.",
        price: 520000,
        category: "skincare",
        stock: 28,
        imageUrl: "https://images.iherb.com/l/BDM-01800-9.jpg",
      },
      {
        name: "کرم مرطوب‌کننده Cetaphil",
        description: "مناسب همه انواع پوست، بدون عطر. آبرسانی ۲۴ ساعته. ۲۵۰ میلی‌لیتر.",
        price: 340000,
        category: "skincare",
        stock: 40,
        imageUrl: "https://images.iherb.com/l/CTF-01025-9.jpg",
      },
      {
        name: "تونر Niacinamide 10% The Ordinary",
        description: "کاهش منافذ، تنظیم چربی و یکنواخت‌سازی رنگ پوست. ۲۴۰ میلی‌لیتر.",
        price: 275000,
        category: "skincare",
        stock: 35,
        imageUrl: "https://images.iherb.com/l/TOC-02238-9.jpg",
      },
      {
        name: "سرم رتینول ۰.۵٪ CeraVe",
        description: "ضدچروک، تجدید سلولی. فرمول آرام برای شروع. ۳۰ میلی‌لیتر. مناسب شب.",
        price: 450000,
        category: "skincare",
        stock: 20,
        imageUrl: "https://images.iherb.com/l/CVE-03124-9.jpg",
      },
      {
        name: "فوم شستشو CeraVe Foaming",
        description: "پاک‌سازی عمیق بدون تخریب سد پوستی. برای پوست چرب و مختلط. ۱۵۰ میلی‌لیتر.",
        price: 295000,
        category: "skincare",
        stock: 45,
        imageUrl: "https://images.iherb.com/l/CVE-03120-9.jpg",
      },
      {
        name: "میسلار واتر Garnier Micellar",
        description: "پاک‌کننده آرایش بدون نیاز به آبکشی. مناسب پوست حساس. ۴۰۰ میلی‌لیتر.",
        price: 220000,
        category: "skincare",
        stock: 50,
        imageUrl: "https://images.iherb.com/l/GNR-06534-9.jpg",
      },
      {
        name: "ماسک صورت Hyaluronic Acid",
        description: "آبرسانی فوری، نرم‌کنندگی و درخشندگی. ۵ عدد ورق ماسک. مناسب همه پوست‌ها.",
        price: 185000,
        category: "skincare",
        stock: 60,
        imageUrl: "https://images.iherb.com/l/MEG-00025-9.jpg",
      },

      // ─── ورزشی ────────────────────────────────────────────────
      {
        name: "پروتئین وی Gold Standard Optimum Nutrition",
        description: "۲۴ گرم پروتئین در هر سرویس. ۵ پوند. طعم شکلات. ایزوله + کانسانتره.",
        price: 2850000,
        category: "sport",
        stock: 15,
        imageUrl: "https://images.iherb.com/l/OPN-00009-9.jpg",
      },
      {
        name: "کراتین مونوهیدرات Creapure NOW Sports",
        description: "خالص‌ترین کراتین بازار. افزایش قدرت و حجم. ۵۰۰ گرم. بدون مزه.",
        price: 680000,
        category: "sport",
        stock: 30,
        imageUrl: "https://images.iherb.com/l/NOW-02967-9.jpg",
      },
      {
        name: "BCAA 2:1:1 Optimum Nutrition",
        description: "آمینواسیدهای شاخه‌دار برای ریکاوری و جلوگیری از کاتابولیسم. ۳۰ سرویس.",
        price: 520000,
        category: "sport",
        stock: 25,
        imageUrl: "https://images.iherb.com/l/OPN-00016-9.jpg",
      },
      {
        name: "پری‌ورکاوت C4 Original Cellucor",
        description: "انرژی، تمرکز و پمپ عضلانی. کافئین ۱۵۰ میلی‌گرم + بتا-آلانین. ۳۰ سرویس.",
        price: 890000,
        category: "sport",
        stock: 20,
        imageUrl: "https://images.iherb.com/l/CLL-80003-9.jpg",
      },
      {
        name: "گلوتامین NOW Sports",
        description: "ریکاوری سریع‌تر، تقویت سیستم ایمنی. ۵ گرم در سرویس. ۵۰۰ گرم پودر خالص.",
        price: 420000,
        category: "sport",
        stock: 30,
        imageUrl: "https://images.iherb.com/l/NOW-02974-9.jpg",
      },
      {
        name: "ایزوله پروتئین وی Dymatize ISO100",
        description: "خالص‌ترین پروتئین وی. ۲۵ گرم پروتئین، زیر ۱ گرم چربی. ۵ پوند. مناسب کات.",
        price: 3200000,
        category: "sport",
        stock: 12,
        imageUrl: "https://images.iherb.com/l/DYM-01400-9.jpg",
      },
      {
        name: "ZMA (زینک + منیزیم + B6) NOW Sports",
        description: "بهبود خواب، افزایش تستوسترون طبیعی و ریکاوری شبانه. ۹۰ کپسول.",
        price: 310000,
        category: "sport",
        stock: 35,
        imageUrl: "https://images.iherb.com/l/NOW-02952-9.jpg",
      },
    ],
  });

  console.log("✅ ۲۶ محصول با تصاویر واقعی اضافه شدن!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
