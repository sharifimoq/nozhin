import { prisma } from "@/lib/prisma";
import AdminClient from "./AdminClient";

export default async function Admin() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const users = await prisma.user.count();
  const routines = await prisma.routine.count();

  return (
    <AdminClient
      products={products}
      stats={{ users, routines, products: products.length }}
    />
  );
}