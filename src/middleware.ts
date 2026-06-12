import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@nozhin.ir";

    if (req.nextUrl.pathname.startsWith("/admin") && token?.email !== adminEmail) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*", "/checkout/:path*"],
};
