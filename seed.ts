import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { PrismaClient } from "./src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&auto=format&q=80`;

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
        imageUrl: u("ffcmO0GLM14"),
      },
      {
        name: "امگا ۳ ۱۲۰۰ میلی‌گرم NOW Foods",
        description: "تقویت قلب، مغز و کاهش التهاب. روغن ماهی تصفیه‌شده. ۱۸۰ عدد سافت ژل.",
        price: 245000,
        category: "supplement",
        stock: 45,
        imageUrl: u("iX4Dj_imAt4"),
      },
      {
        name: "ویتامین D3 + K2 2000 IU NOW Foods",
        description: "تقویت استخوان، سیستم ایمنی و خلق‌وخو. ترکیب D3 و K2 برای جذب بهتر. ۱۲۰ کپسول.",
        price: 210000,
        category: "supplement",
        stock: 50,
        imageUrl: u("Lx9NITOZJTE"),
      },
      {
        name: "زینک ۵۰ میلی‌گرم NOW Foods",
        description: "تقویت سیستم ایمنی، پوست و مو. زینک گلوکونات با جذب بالا. ۲۵۰ قرص.",
        price: 165000,
        category: "supplement",
        stock: 70,
        imageUrl: u("yY145j0NdOQ"),
      },
      {
        name: "بیوتین ۱۰۰۰۰ میکروگرم NOW Foods",
        description: "تقویت مو، ناخن و پوست. فرمول زیست‌فراهم. ۱۲۰ کپسول. مناسب موهای ریزش‌دار.",
        price: 195000,
        category: "supplement",
        stock: 55,
        imageUrl: u("EUlDhZSyMpg"),
      },
      {
        name: "منیزیم ۴۰۰ میلی‌گرم NOW Foods",
        description: "کاهش استرس، بهبود خواب و ریلکس عضلات. منیزیم اکسید. ۱۸۰ قرص.",
        price: 175000,
        category: "supplement",
        stock: 40,
        imageUrl: u("WAgSCeCGB5Y"),
      },
      {
        name: "مولتی ویتامین زنانه Optimum Nutrition",
        description: "فرمول کامل ۲۳ ویتامین و مینرال مخصوص خانم‌ها. آهن، فولیک اسید و کلسیم بالا. ۶۰ قرص.",
        price: 320000,
        category: "supplement",
        stock: 35,
        imageUrl: u("ktBXHKC50vc"),
      },
      {
        name: "مولتی ویتامین مردانه Optimum Nutrition",
        description: "فرمول کامل مخصوص آقایان. زینک، سلنیوم، ویتامین‌های گروه B. ۶۰ قرص.",
        price: 310000,
        category: "supplement",
        stock: 35,
        imageUrl: u("kNqkjBgvZiI"),
      },
      {
        name: "کلاژن پپتید ۵۰۰۰ میلی‌گرم",
        description: "جوانسازی پوست، تقویت مفاصل و مو. هیدرولیز شده از منبع گاوی. ۳۰ ساشه.",
        price: 480000,
        category: "supplement",
        stock: 25,
        imageUrl: u("gd5LLgE-4Ps"),
      },

      // ─── پوستی ────────────────────────────────────────────────
      {
        name: "سرم ویتامین C 20% The Ordinary",
        description: "روشن‌کننده، ضدلک و ضدچروک. فرمول آسکوربیک اسید خالص. ۳۰ میلی‌لیتر.",
        price: 390000,
        category: "skincare",
        stock: 30,
        imageUrl: u("96vRihviwac"),
      },
      {
        name: "ضدآفتاب SPF50+ Bioderma Photoderm",
        description: "محافظت UVA/UVB، مناسب پوست حساس. بافت سبک و غیرچرب. ۵۰ میلی‌لیتر. ساخت فرانسه.",
        price: 520000,
        category: "skincare",
        stock: 28,
        imageUrl: u("3Uj7ttuo5kk"),
      },
      {
        name: "کرم مرطوب‌کننده Cetaphil",
        description: "مناسب همه انواع پوست، بدون عطر. آبرسانی ۲۴ ساعته. ۲۵۰ میلی‌لیتر.",
        price: 340000,
        category: "skincare",
        stock: 40,
        imageUrl: u("eHE5l7cJVRY"),
      },
      {
        name: "تونر Niacinamide 10% The Ordinary",
        description: "کاهش منافذ، تنظیم چربی و یکنواخت‌سازی رنگ پوست. ۲۴۰ میلی‌لیتر.",
        price: 275000,
        category: "skincare",
        stock: 35,
        imageUrl: u("RLxWVl7dCg8"),
      },
      {
        name: "سرم رتینول ۰.۵٪ CeraVe",
        description: "ضدچروک، تجدید سلولی. فرمول آرام برای شروع. ۳۰ میلی‌لیتر. مناسب شب.",
        price: 450000,
        category: "skincare",
        stock: 20,
        imageUrl: u("KiQt6CC0BvY"),
      },
      {
        name: "فوم شستشو CeraVe Foaming",
        description: "پاک‌سازی عمیق بدون تخریب سد پوستی. برای پوست چرب و مختلط. ۱۵۰ میلی‌لیتر.",
        price: 295000,
        category: "skincare",
        stock: 45,
        imageUrl: u("XanILp6v_Eg"),
      },
      {
        name: "میسلار واتر Garnier Micellar",
        description: "پاک‌کننده آرایش بدون نیاز به آبکشی. مناسب پوست حساس. ۴۰۰ میلی‌لیتر.",
        price: 220000,
        category: "skincare",
        stock: 50,
        imageUrl: u("RJ0v-mj0Yxs"),
      },
      {
        name: "ماسک صورت Hyaluronic Acid",
        description: "آبرسانی فوری، نرم‌کنندگی و درخشندگی. ۵ عدد ورق ماسک. مناسب همه پوست‌ها.",
        price: 185000,
        category: "skincare",
        stock: 60,
        imageUrl: u("DNohKoNoKEk"),
      },

      // ─── ورزشی ────────────────────────────────────────────────
      {
        name: "پروتئین وی Gold Standard Optimum Nutrition",
        description: "۲۴ گرم پروتئین در هر سرویس. ۵ پوند. طعم شکلات. ایزوله + کانسانتره.",
        price: 2850000,
        category: "sport",
        stock: 15,
        imageUrl: u("R23MqZKCBcM"),
      },
      {
        name: "کراتین مونوهیدرات Creapure NOW Sports",
        description: "خالص‌ترین کراتین بازار. افزایش قدرت و حجم. ۵۰۰ گرم. بدون مزه.",
        price: 680000,
        category: "sport",
        stock: 30,
        imageUrl: u("FQsYjtIPoTM"),
      },
      {
        name: "BCAA 2:1:1 Optimum Nutrition",
        description: "آمینواسیدهای شاخه‌دار برای ریکاوری و جلوگیری از کاتابولیسم. ۳۰ سرویس.",
        price: 520000,
        category: "sport",
        stock: 25,
        imageUrl: u("MUlIfSNODXE"),
      },
      {
        name: "پری‌ورکاوت C4 Original Cellucor",
        description: "انرژی، تمرکز و پمپ عضلانی. کافئین ۱۵۰ میلی‌گرم + بتا-آلانین. ۳۰ سرویس.",
        price: 890000,
        category: "sport",
        stock: 20,
        imageUrl: u("ENhnTZfDfaA"),
      },
      {
        name: "گلوتامین NOW Sports",
        description: "ریکاوری سریع‌تر، تقویت سیستم ایمنی. ۵ گرم در سرویس. ۵۰۰ گرم پودر خالص.",
        price: 420000,
        category: "sport",
        stock: 30,
        imageUrl: u("DvunqLOsKco"),
      },
      {
        name: "ایزوله پروتئین وی Dymatize ISO100",
        description: "خالص‌ترین پروتئین وی. ۲۵ گرم پروتئین، زیر ۱ گرم چربی. ۵ پوند. مناسب کات.",
        price: 3200000,
        category: "sport",
        stock: 12,
        imageUrl: u("RB5aw1rOG3k"),
      },
      {
        name: "ZMA (زینک + منیزیم + B6) NOW Sports",
        description: "بهبود خواب، افزایش تستوسترون طبیعی و ریکاوری شبانه. ۹۰ کپسول.",
        price: 310000,
        category: "sport",
        stock: 35,
        imageUrl: u("rRBtKW_aw_U"),
      },
    ],
  });

  console.log("✅ ۲۶ محصول با تصاویر واقعی اضافه شدن!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
