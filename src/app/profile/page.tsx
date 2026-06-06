import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Profile() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { routines: { orderBy: { createdAt: "desc" } } },
  });

  return (
    <main className="min-h-screen bg-rose-50" dir="rtl">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-rose-500">نوژین</a>
          <nav className="flex gap-6 text-sm text-gray-600">
            <a href="/products" className="hover:text-rose-500">محصولات</a>
            <a href="/quiz" className="hover:text-rose-500">روتین من</a>
          </nav>
          <span className="text-sm text-gray-500">{user?.name}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-xl">{user?.name}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
          <div className="mr-auto">
            <a href="/quiz" className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-600">
              روتین جدید
            </a>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">روتین‌های قبلی</h3>

        {user?.routines.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="text-4xl mb-3">🌸</div>
            <p className="text-gray-400">هنوز روتینی نداری — برو پرسشنامه رو پر کن!</p>
            <a href="/quiz" className="inline-block mt-4 bg-rose-500 text-white px-6 py-2 rounded-full text-sm hover:bg-rose-600">
              شروع کن
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {user?.routines.map((routine: { id: string; result: string; createdAt: Date }) => (
              <div key={routine.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">
                    {new Date(routine.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="text-gray-700 leading-8 whitespace-pre-line text-sm">
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