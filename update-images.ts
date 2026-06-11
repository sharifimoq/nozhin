import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { PrismaClient } from "./src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&auto=format&q=80`;

const IMAGES: Record<string, string> = {
  // ─── مکمل‌ها
  "ویتامین C ۱۰۰۰ میلی‌گرم Nature Made":       u("ffcmO0GLM14"),
  "امگا ۳ ۱۲۰۰ میلی‌گرم NOW Foods":            u("iX4Dj_imAt4"),
  "ویتامین D3 + K2 2000 IU NOW Foods":          u("Lx9NITOZJTE"),
  "زینک ۵۰ میلی‌گرم NOW Foods":                u("yY145j0NdOQ"),
  "بیوتین ۱۰۰۰۰ میکروگرم NOW Foods":           u("EUlDhZSyMpg"),
  "منیزیم ۴۰۰ میلی‌گرم NOW Foods":             u("WAgSCeCGB5Y"),
  "مولتی ویتامین زنانه Optimum Nutrition":      u("ktBXHKC50vc"),
  "مولتی ویتامین مردانه Optimum Nutrition":     u("kNqkjBgvZiI"),
  "کلاژن پپتید ۵۰۰۰ میلی‌گرم":               u("gd5LLgE-4Ps"),

  // ─── پوستی
  "سرم ویتامین C 20% The Ordinary":            u("96vRihviwac"),
  "ضدآفتاب SPF50+ Bioderma Photoderm":          u("3Uj7ttuo5kk"),
  "کرم مرطوب‌کننده Cetaphil":                  u("eHE5l7cJVRY"),
  "تونر Niacinamide 10% The Ordinary":          u("RLxWVl7dCg8"),
  "سرم رتینول ۰.۵٪ CeraVe":                   u("KiQt6CC0BvY"),
  "فوم شستشو CeraVe Foaming":                  u("XanILp6v_Eg"),
  "میسلار واتر Garnier Micellar":               u("RJ0v-mj0Yxs"),
  "ماسک صورت Hyaluronic Acid":                 u("DNohKoNoKEk"),

  // ─── ورزشی
  "پروتئین وی Gold Standard Optimum Nutrition": u("R23MqZKCBcM"),
  "کراتین مونوهیدرات Creapure NOW Sports":      u("FQsYjtIPoTM"),
  "BCAA 2:1:1 Optimum Nutrition":               u("MUlIfSNODXE"),
  "پری‌ورکاوت C4 Original Cellucor":            u("ENhnTZfDfaA"),
  "گلوتامین NOW Sports":                        u("DvunqLOsKco"),
  "ایزوله پروتئین وی Dymatize ISO100":          u("RB5aw1rOG3k"),
  "ZMA (زینک + منیزیم + B6) NOW Sports":       u("rRBtKW_aw_U"),
};

async function main() {
  let updated = 0;
  for (const [name, imageUrl] of Object.entries(IMAGES)) {
    const result = await prisma.product.updateMany({
      where: { name },
      data: { imageUrl },
    });
    if (result.count > 0) {
      console.log(`✅ ${name}`);
      updated++;
    } else {
      console.log(`⚠️  پیدا نشد: ${name}`);
    }
  }
  console.log(`\n${updated}/${Object.keys(IMAGES).length} محصول آپدیت شد`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
