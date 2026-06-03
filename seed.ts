import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "ویتامین C",
        description: "تقویت سیستم ایمنی و سلامت پوست",
        price: 85000,
        category: "مکمل",
        stock: 50,
        image: "https://placehold.co/400x400?text=Vitamin+C",
      },
      {
        name: "امگا ۳",
        description: "تقویت قلب، مغز و پوست",
        price: 120000,
        category: "مکمل",
        stock: 30,
        image: "https://placehold.co/400x400?text=Omega+3",
      },
      {
        name: "ویتامین D3",
        description: "تقویت استخوان و سیستم ایمنی",
        price: 95000,
        category: "مکمل",
        stock: 40,
        image: "https://placehold.co/400x400?text=Vitamin+D3",
      },
      {
        name: "سرم ویتامین C پوست",
        description: "روشن‌کننده و ضدلک پوست",
        price: 250000,
        category: "پوستی",
        stock: 20,
        image: "https://placehold.co/400x400?text=Serum+C",
      },
      {
        name: "کرم مرطوب‌کننده",
        description: "مناسب برای همه انواع پوست",
        price: 180000,
        category: "پوستی",
        stock: 25,
        image: "https://placehold.co/400x400?text=Moisturizer",
      },
      {
        name: "ضد آفتاب SPF50",
        description: "محافظت در برابر اشعه UV",
        price: 220000,
        category: "پوستی",
        stock: 35,
        image: "https://placehold.co/400x400?text=SPF50",
      },
    ],
  });

  console.log("✅ محصولات اضافه شدن!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());