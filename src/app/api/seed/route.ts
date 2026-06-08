import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = [
      { name: 'سرم ویتامین C', price: 185000, category: 'skincare', description: 'روشن‌کننده و ضد پیری — مناسب صبح' },
      { name: 'ضد آفتاب SPF50', price: 220000, category: 'skincare', description: 'محافظت کامل در برابر اشعه UVA و UVB' },
      { name: 'رتینول شب', price: 345000, category: 'skincare', description: 'ضد چروک و جوانساز — مخصوص شب' },
      { name: 'مویسچرایزر آبرسان', price: 160000, category: 'skincare', description: 'مناسب پوست خشک و معمولی' },
      { name: 'امگا ۳', price: 98000, category: 'supplement', description: '۲ عدد با صبحانه — سلامت قلب و مغز' },
      { name: 'مولتی‌ویتامین زنانه', price: 195000, category: 'supplement', description: 'ترکیب کامل ویتامین‌ها و مینرال‌ها' },
      { name: 'ویتامین D3', price: 75000, category: 'supplement', description: '۱۰۰۰ واحد — مناسب کمبود آفتاب' },
      { name: 'کلاژن پودری', price: 280000, category: 'supplement', description: 'تقویت پوست، مو و ناخن' },
      { name: 'کراتین مونوهیدرات', price: 280000, category: 'sport', description: '۵ گرم روزانه — افزایش قدرت و حجم' },
      { name: 'پروتئین وی ایزوله', price: 420000, category: 'sport', description: '۲۵ گرم پروتئین در هر سرو' },
      { name: 'BCAA', price: 165000, category: 'sport', description: 'ریکاوری سریع‌تر بعد از تمرین' },
    ]

    await prisma.product.deleteMany()
    await prisma.product.createMany({ data: products })

    return NextResponse.json({ success: true, count: products.length })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}