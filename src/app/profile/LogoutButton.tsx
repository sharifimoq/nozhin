"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        background: "none",
        border: "1px solid #e53e3e",
        color: "#e53e3e",
        padding: "10px 24px",
        borderRadius: 50,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "'Vazirmatn', sans-serif",
        cursor: "pointer",
      }}
    >
      خروج از حساب
    </button>
  );
}
