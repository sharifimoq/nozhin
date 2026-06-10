"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const s = {
  greenDark: '#1A3A2A',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  greenMid: '#2D6A4F',
  textMuted: '#5A5A56',
}

export default function NavbarActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div style={{ width: 80, height: 36 }} />;
  }

  if (session) {
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link href="/cart" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>🛒 سبد</Link>
        <Link href="/orders" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>سفارش‌ها</Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/profile" style={{
            background: s.greenPale, color: s.greenDark, fontSize: 13, fontWeight: 700,
            padding: "8px 18px", borderRadius: 50, textDecoration: "none",
          }}>
            {session.user?.name?.split(" ")[0] ?? "پروفایل"}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              background: "none", border: `1px solid rgba(26,58,42,0.15)`,
              borderRadius: 50, padding: "7px 14px", fontSize: 12,
              color: s.textMuted, cursor: "pointer", fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            خروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Link href="/cart" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>🛒 سبد</Link>
      <Link href="/login" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>ورود</Link>
      <Link href="/register" style={{
        background: s.greenDark, color: "white", fontSize: 13, fontWeight: 600,
        padding: "9px 20px", borderRadius: 50, textDecoration: "none",
      }}>
        ثبت‌نام
      </Link>
    </div>
  );
}
