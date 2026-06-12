import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@nozhin.ir";

export default async function Admin() {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  const token = await getToken({
    req: { cookies: { "next-auth.session-token": sessionToken, "__Secure-next-auth.session-token": sessionToken } } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || token.email !== ADMIN_EMAIL) redirect("/login");

  const [products, orders, userList, routines, coupons] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } }),
    prisma.user.findMany({ select: { id: true, name: true, email: true, createdAt: true }, orderBy: { createdAt: "desc" } }),
    prisma.routine.count(),
    prisma.coupon.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const revenue = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.total, 0);

  return (
    <AdminClient
      products={products}
      orders={orders}
      users={userList}
      coupons={coupons}
      stats={{ users: userList.length, routines, products: products.length, orders: orders.length, revenue }}
    />
  );
}