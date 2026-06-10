import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminClient from "./AdminClient";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@nozhin.ir";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.email !== ADMIN_EMAIL) {
    redirect("/login");
  }

  const [products, orders, users, routines] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } }),
    prisma.user.count(),
    prisma.routine.count(),
  ]);

  const revenue = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.total, 0);

  return (
    <AdminClient
      products={products}
      orders={orders}
      stats={{ users, routines, products: products.length, orders: orders.length, revenue }}
    />
  );
}