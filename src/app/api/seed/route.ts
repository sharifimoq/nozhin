import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = [
      { name: 'سرم ویتامین C', price: 185000, category: 'skincare', description: 'روشن‌کننده و ضد پیری — مناسب صبح', stock: 50 },
      { name: 'ضد آفتاب SPF50', price: 220000, category: 'skincare', description: 'محافظت کامل در برابر اشعه UVA و UVB', stock: 40 },
      { name: 'رتینول شب', price: 345000, category: 'skincare', description: 'ضد چروک و جوانساز — مخصوص شب', stock: 30 },
      { name: 'مویسچرایزر آبرسان', price: 160000, category: 'skincare', description: 'مناسب پوست خشک و معمولی', stock: 60 },
      { name: 'امگا ۳', price: 98000, category: 'supplement', description: '۲ عدد با صبحانه — سلامت قلب و مغز', stock: 100 },
      { name: 'مولتی‌ویتامین زنانه', price: 195000, category: 'supplement', description: 'ترکیب کامل ویتامین‌ها و مینرال‌ها', stock: 80 },
      { name: 'ویتامین D3', price: 75000, category: 'supplement', description: '۱۰۰۰ واحد — مناسب کمبود آفتاب', stock: 120 },
      { name: 'کلاژن پودری', price: 280000, category: 'supplement', description: 'تقویت پوست، مو و ناخن', stock: 45 },
      { name: 'کراتین مونوهیدرات', price: 280000, category: 'sport', description: '۵ گرم روزانه — افزایش قدرت و حجم', stock: 70 },
      { name: 'پروتئین وی ایزوله', price: 420000, category: 'sport', description: '۲۵ گرم پروتئین در هر سرو', stock: 35 },
      { name: 'BCAA', price: 165000, category: 'sport', description: 'ریکاوری سریع‌تر بعد از تمرین', stock: 55 },
    ]

    await prisma.product.deleteMany()
    await prisma.product.createMany({ data: products })

    return NextResponse.json({ success: true, count: products.length })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}