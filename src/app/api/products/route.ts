import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'خطا در دریافت محصولات' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, category, description, imageUrl } = body

    if (!name || !price || !category) {
      return NextResponse.json({ error: 'نام، قیمت و دسته‌بندی الزامی است' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        category,
        description: description ?? '',
        imageUrl: imageUrl ?? null,
      },
    })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ایجاد محصول' }, { status: 500 })
  }
}