import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
    <main className="min-h-screen" style={{ background: "var(--cream)" }} dir="rtl">
      <header style={{ background: "var(--cream)", borderBottom: "0.5px solid #E8E4DC" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{ background: "var(--sage)", borderRadius: "10px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontFamily: "var(--font-playfair)", fontSize: "16px" }}>ن</span>
            </div>
            <a href="/" style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", textDecoration: "none" }}>نوژین</a>
          </div>
          <nav className="flex gap-8 text-sm" style={{ color: "var(--mid)" }}>
            <a href="/products" className="hover:text-black transition-colors">محصولات</a>
            <a href="/quiz" className="hover:text-black transition-colors">روتین من</a>
          </nav>
          <span style={{ fontSize: "14px", color: "var(--mid)" }}>{user?.name}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div style={{ background: "white", borderRadius: "20px", border: "0.5px solid #E8E4DC", padding: "24px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "56px", height: "56px", background: "var(--sage-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "20px", color: "var(--dark)", marginBottom: "4px" }}>{user?.name}</h2>
            <p style={{ fontSize: "13px", color: "var(--light)" }}>{user?.email}</p>
          </div>
          <a href="/quiz" style={{ background: "var(--sage)", color: "white", padding: "10px 20px", borderRadius: "100px", fontSize: "13px", textDecoration: "none" }}>
            روتین جدید
          </a>
        </div>

        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "22px", color: "var(--dark)", marginBottom: "20px" }}>روتین‌های قبلی</h3>

        {routines.length === 0 ? (
          <div style={{ background: "white", borderRadius: "20px", border: "0.5px solid #E8E4DC", padding: "48px", textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌿</div>
            <p style={{ color: "var(--light)", fontSize: "14px", marginBottom: "20px" }}>هنوز روتینی نداری — برو پرسشنامه رو پر کن!</p>
            <a href="/quiz" style={{ background: "var(--sage)", color: "white", padding: "10px 24px", borderRadius: "100px", fontSize: "13px", textDecoration: "none" }}>
              شروع کن
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {routines.map((routine) => (
              <div key={routine.id} style={{ background: "white", borderRadius: "20px", border: "0.5px solid #E8E4DC", padding: "24px" }}>
                <div style={{ fontSize: "12px", color: "var(--light)", marginBottom: "16px", letterSpacing: "0.04em" }}>
                  {new Date(routine.createdAt).toLocaleDateString("fa-IR")}
                </div>
                <div style={{ fontSize: "14px", color: "var(--mid)", lineHeight: "2", whiteSpace: "pre-line" }}>
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