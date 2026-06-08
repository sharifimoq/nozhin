import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await prisma.product.delete({
    where: { id: Number(id) },
  })

  return NextResponse.json({ message: 'حذف شد' })
}