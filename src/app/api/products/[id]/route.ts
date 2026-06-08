import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'خطا در حذف محصول' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, price, category, description, imageUrl } = body

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
        category,
        description: description ?? '',
        imageUrl: imageUrl ?? null,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ویرایش محصول' }, { status: 500 })
  }
}