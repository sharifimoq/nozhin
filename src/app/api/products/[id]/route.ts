import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, price, category, description, imageUrl, stock } = body

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        category,
        description: description ?? '',
        imageUrl: imageUrl ?? null,
        stock: Number(stock) || 0,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ویرایش محصول' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'خطا در حذف محصول' }, { status: 500 })
  }
}
