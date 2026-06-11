"use client";
import { useEffect, useState } from "react";

type ToastType = "success" | "error";

type Toast = { id: number; message: string; type: ToastType };

let toastId = 0;
let externalAdd: ((msg: string, type: ToastType) => void) | null = null;

export function showToast(message: string, type: ToastType = "success") {
  externalAdd?.(message, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    externalAdd = (message, type) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
    };
    return () => { externalAdd = null; };
  }, []);

  if (!toasts.length) return null;

  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      display: "flex", flexDirection: "column", gap: 8, zIndex: 9999,
      alignItems: "center",
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: t.type === "success" ? "#1A3A2A" : "#c0392b",
          color: "white", padding: "12px 24px", borderRadius: 50,
          fontSize: 13, fontWeight: 600, fontFamily: "'Vazirmatn', sans-serif",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          animation: "slideUp 0.2s ease",
          whiteSpace: "nowrap",
        }}>
          {t.type === "success" ? "✓ " : "✗ "}{t.message}
        </div>
      ))}
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }`}</style>
    </div>
  );
}
