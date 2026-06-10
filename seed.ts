import "dotenv/config";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

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
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Vitamin+C",
      },
      {
        name: "امگا ۳ ۱۲۰۰ میلی‌گرم Naturo Sciences",
        description: "تقویت قلب، مغز و کاهش التهاب. روغن ماهی تصفیه‌شده. ۹۰ عدد سافت ژل.",
        price: 245000,
        category: "supplement",
        stock: 45,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Omega+3",
      },
      {
        name: "ویتامین D3 + K2 2000 IU",
        description: "تقویت استخوان، سیستم ایمنی و خلق‌وخو. ترکیب D3 و K2 برای جذب بهتر. ۶۰ کپسول.",
        price: 210000,
        category: "supplement",
        stock: 50,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Vit+D3+K2",
      },
      {
        name: "زینک ۵۰ میلی‌گرم NOW Foods",
        description: "تقویت سیستم ایمنی، پوست و مو. زینک گلوکونات با جذب بالا. ۲۵۰ قرص.",
        price: 165000,
        category: "supplement",
        stock: 70,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Zinc",
      },
      {
        name: "بیوتین ۱۰۰۰۰ میکروگرم",
        description: "تقویت مو، ناخن و پوست. فرمول زیست‌فراهم. ۱۲۰ قرص. مناسب موهای ریزش‌دار.",
        price: 195000,
        category: "supplement",
        stock: 55,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Biotin",
      },
      {
        name: "منیزیم ۴۰۰ میلی‌گرم NOW Foods",
        description: "کاهش استرس، بهبود خواب و ریلکس عضلات. منیزیم اکسید. ۱۸۰ قرص.",
        price: 175000,
        category: "supplement",
        stock: 40,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Magnesium",
      },
      {
        name: "مولتی ویتامین زنانه Optimum Nutrition",
        description: "فرمول کامل ۲۳ ویتامین و مینرال مخصوص خانم‌ها. آهن، فولیک اسید و کلسیم بالا. ۶۰ قرص.",
        price: 320000,
        category: "supplement",
        stock: 35,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Multi+Women",
      },
      {
        name: "مولتی ویتامین مردانه Optimum Nutrition",
        description: "فرمول کامل مخصوص آقایان. زینک، سلنیوم، ویتامین‌های گروه B. ۶۰ قرص.",
        price: 310000,
        category: "supplement",
        stock: 35,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Multi+Men",
      },
      {
        name: "کلاژن پپتید ۵۰۰۰ میلی‌گرم",
        description: "جوانسازی پوست، تقویت مفاصل و مو. هیدرولیز شده از منبع گاوی. ۳۰ ساشه.",
        price: 480000,
        category: "supplement",
        stock: 25,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Collagen",
      },

      // ─── پوستی ────────────────────────────────────────────────
      {
        name: "سرم ویتامین C 20% The Ordinary",
        description: "روشن‌کننده، ضدلک و ضدچروک. فرمول آسکوربیک اسید خالص. ۳۰ میلی‌لیتر.",
        price: 390000,
        category: "skincare",
        stock: 30,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Vit+C+Serum",
      },
      {
        name: "ضدآفتاب SPF50+ Bioderma Photoderm",
        description: "محافظت UVA/UVB، مناسب پوست حساس. بافت سبک و غیرچرب. ۵۰ میلی‌لیتر. ساخت فرانسه.",
        price: 520000,
        category: "skincare",
        stock: 28,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=SPF50+Bioderma",
      },
      {
        name: "کرم مرطوب‌کننده Cetaphil",
        description: "مناسب همه انواع پوست، بدون عطر. آبرسانی ۲۴ ساعته. ۲۵۰ میلی‌لیتر.",
        price: 340000,
        category: "skincare",
        stock: 40,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Cetaphil",
      },
      {
        name: "تونر Niacinamide 10% The Ordinary",
        description: "کاهش منافذ، تنظیم چربی و یکنواخت‌سازی رنگ پوست. ۲۴۰ میلی‌لیتر.",
        price: 275000,
        category: "skincare",
        stock: 35,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Niacinamide",
      },
      {
        name: "سرم رتینول ۰.۵٪ CeraVe",
        description: "ضدچروک، تجدید سلولی. فرمول آرام برای شروع. ۳۰ میلی‌لیتر. مناسب شب.",
        price: 450000,
        category: "skincare",
        stock: 20,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Retinol+CeraVe",
      },
      {
        name: "فوم شستشو CeraVe Foaming",
        description: "پاک‌سازی عمیق بدون تخریب سد پوستی. برای پوست چرب و مختلط. ۱۵۰ میلی‌لیتر.",
        price: 295000,
        category: "skincare",
        stock: 45,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=CeraVe+Foam",
      },
      {
        name: "میسلار واتر Garnier Micellar",
        description: "پاک‌کننده آرایش بدون نیاز به آبکشی. مناسب پوست حساس. ۴۰۰ میلی‌لیتر.",
        price: 220000,
        category: "skincare",
        stock: 50,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Garnier+Micellar",
      },
      {
        name: "ماسک صورت Hyaluronic Acid",
        description: "آبرسانی فوری، نرم‌کنندگی و درخشندگی. ۵ عدد ورق ماسک. مناسب همه پوست‌ها.",
        price: 185000,
        category: "skincare",
        stock: 60,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=HA+Mask",
      },

      // ─── ورزشی ────────────────────────────────────────────────
      {
        name: "پروتئین وی Gold Standard Optimum Nutrition",
        description: "۲۴ گرم پروتئین در هر سرویس. ۵ پوند. طعم شکلات. ایزوله + کانسانتره. یکی از بهترین برندهای دنیا.",
        price: 2850000,
        category: "sport",
        stock: 15,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Whey+ON",
      },
      {
        name: "کراتین مونوهیدرات Creapure",
        description: "خالص‌ترین کراتین بازار. افزایش قدرت و حجم. ۵۰۰ گرم. بدون مزه.",
        price: 680000,
        category: "sport",
        stock: 30,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Creatine",
      },
      {
        name: "BCAA 2:1:1 MuscleTech",
        description: "آمینواسیدهای شاخه‌دار برای ریکاوری و جلوگیری از کاتابولیسم. ۳۰ سرویس. طعم هندوانه.",
        price: 520000,
        category: "sport",
        stock: 25,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=BCAA",
      },
      {
        name: "پری‌ورکاوت C4 Original Cellucor",
        description: "انرژی، تمرکز و پمپ عضلانی. کافئین ۱۵۰ میلی‌گرم + بتا-آلانین. ۳۰ سرویس. طعم انار.",
        price: 890000,
        category: "sport",
        stock: 20,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=C4+Pre-Workout",
      },
      {
        name: "گلوتامین NOW Sports",
        description: "ریکاوری سریع‌تر، تقویت سیستم ایمنی. ۵ گرم در سرویس. ۵۰۰ گرم پودر خالص.",
        price: 420000,
        category: "sport",
        stock: 30,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=Glutamine",
      },
      {
        name: "ایزوله پروتئین وی Dymatize ISO100",
        description: "خالص‌ترین پروتئین وی. ۲۵ گرم پروتئین، زیر ۱ گرم چربی. ۵ پوند. مناسب کات.",
        price: 3200000,
        category: "sport",
        stock: 12,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=ISO100",
      },
      {
        name: "ZMA (زینک + منیزیم + B6) NOW Foods",
        description: "بهبود خواب، افزایش تستوسترون طبیعی و ریکاوری شبانه. ۹۰ کپسول.",
        price: 310000,
        category: "sport",
        stock: 35,
        imageUrl: "https://placehold.co/400x400/D8F3DC/1A3A2A?text=ZMA",
      },
    ],
  });

  console.log("✅ ۲۶ محصول واقعی اضافه شدن!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
