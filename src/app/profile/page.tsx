import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { s, font } from '@/lib/styles';

type Routine = {
  id: string;
  result: string;
  createdAt: Date;
};

export default async function Profile() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { routines: { orderBy: { createdAt: "desc" } } },
  });

  const routines: Routine[] = (user as any)?.routines ?? [];

  return (
    <main style={{ minHeight: "100vh", background: s.cream, fontFamily: font, direction: "rtl" }}>

      {/* Navbar */}
      <nav style={{
        background: "white", borderBottom: `1px solid ${s.border}`,
        padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" style={{ fontSize: 26, fontWeight: 900, color: s.greenDark, textDecoration: "none" }}>
          نوژ<span style={{ color: s.greenLight }}>ین</span>
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          <a href="/products" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>محصولات</a>
          <a href="/quiz" style={{ fontSize: 14, color: s.textMuted, textDecoration: "none" }}>روتین من</a>
        </div>
        <span style={{ fontSize: 14, color: s.textMuted }}>{user?.name}</span>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>

        {/* کارت پروفایل */}
        <div style={{
          background: "white", borderRadius: 20, border: `1px solid ${s.border}`,
          padding: "24px 28px", marginBottom: 32,
          display: "flex", alignItems: "center", gap: 20,
        }}>
          <div style={{
            width: 56, height: 56, background: s.greenPale, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0,
          }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: s.greenDark, marginBottom: 4 }}>
              {user?.name}
            </div>
            <div style={{ fontSize: 13, color: s.textMuted }}>{user?.email}</div>
          </div>
          <a href="/quiz" style={{
            background: s.greenDark, color: "white", padding: "10px 24px",
            borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>
            روتین جدید
          </a>
        </div>

        {/* روتین‌های قبلی */}
        <div style={{ fontSize: 20, fontWeight: 900, color: s.greenDark, marginBottom: 20 }}>
          روتین‌های قبلی
        </div>

        {routines.length === 0 ? (
          <div style={{
            background: "white", borderRadius: 20, border: `1px solid ${s.border}`,
            padding: "56px", textAlign: "center",
          }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🌿</div>
            <p style={{ color: s.textMuted, fontSize: 14, marginBottom: 24 }}>
              هنوز روتینی نداری — برو پرسشنامه رو پر کن!
            </p>
            <a href="/quiz" style={{
              background: s.greenDark, color: "white", padding: "12px 28px",
              borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: "none",
            }}>
              شروع کن
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {routines.map((routine, index) => (
              <div key={routine.id} style={{
                background: "white", borderRadius: 20,
                border: `1px solid ${s.border}`, padding: "24px 28px",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 16,
                }}>
                  <div style={{
                    background: s.greenPale, color: s.greenMid,
                    fontSize: 11, fontWeight: 700, padding: "4px 12px",
                    borderRadius: 50, letterSpacing: 1,
                  }}>
                    روتین {index + 1}
                  </div>
                  <div style={{ fontSize: 12, color: s.textMuted }}>
                    {new Date(routine.createdAt).toLocaleDateString("fa-IR")}
                  </div>
                </div>
                <div style={{
                  fontSize: 14, color: s.textMuted, lineHeight: 2,
                  whiteSpace: "pre-line", background: s.cream,
                  borderRadius: 12, padding: "16px 20px",
                }}>
                  {routine.result}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}