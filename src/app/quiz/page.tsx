"use client";
import { useState } from "react";

const questions = [
  { id: 1, question: "نوع پوستت چیه؟", options: ["چرب", "خشک", "مختلط", "حساس", "نمی‌دونم"] },
  { id: 2, question: "بزرگترین نگرانی پوستت چیه؟", options: ["جوش و آکنه", "چین و چروک", "لک و تیرگی", "خشکی و پوسته‌پوسته", "منافذ باز"] },
  { id: 3, question: "سنت چقدره؟", options: ["زیر ۲۰", "۲۰ تا ۳۰", "۳۰ تا ۴۰", "بالای ۴۰"] },
  { id: 4, question: "هدفت از مکمل چیه؟", options: ["انرژی بیشتر", "تقویت ایمنی", "سلامت پوست و مو", "کاهش وزن", "تقویت عضله"] },
  { id: 5, question: "سبک زندگیت چطوره؟", options: ["پشت میزنشین", "فعال و ورزشکار", "استرس زیاد", "خواب نامنظم"] },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      const response = await fetch("/api/routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers, questions: questions.map((q) => q.question) }),
      });
      const data = await response.json();
      setResult(data.routine);
      await fetch("/api/routine/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers, result: data.routine }),
      });
      setLoading(false);
    }
  };

  const btnStyle = {
    textAlign: "right" as const,
    padding: "14px 20px",
    borderRadius: "12px",
    border: "0.5px solid #E8E4DC",
    background: "white",
    fontSize: "14px",
    color: "var(--dark)",
    cursor: "pointer",
    width: "100%",
    marginBottom: "10px",
    display: "block",
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }} dir="rtl">
      <div style={{ width: "100%", maxWidth: "560px", margin: "0 16px" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <a href="/" style={{ textDecoration: "none", fontFamily: "var(--font-playfair)", fontSize: "24px", color: "var(--dark)" }}>نوژین</a>
        </div>

        <div style={{ background: "white", borderRadius: "24px", border: "0.5px solid #E8E4DC", padding: "40px" }}>

          {result ? (
            <div>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ background: "var(--sage-light)", color: "var(--sage)", fontSize: "11px", padding: "6px 16px", borderRadius: "100px", display: "inline-block", fontWeight: "500", marginBottom: "16px" }}>
                  روتین شخصی شما
                </div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "26px", color: "var(--dark)" }}>آماده‌ست 🌿</h2>
              </div>
              <div style={{ fontSize: "14px", color: "var(--mid)", lineHeight: "2", whiteSpace: "pre-line", background: "var(--cream)", borderRadius: "16px", padding: "24px" }}>
                {result}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button
                  onClick={() => { setResult(""); setCurrent(0); setAnswers([]); }}
                  style={{ flex: 1, background: "transparent", color: "var(--sage)", border: "1px solid var(--sage)", padding: "12px", borderRadius: "100px", fontSize: "14px", cursor: "pointer" }}
                >
                  دوباره امتحان کن
                </button>
                <a href="/products" style={{ flex: 1, background: "var(--sage)", color: "white", padding: "12px", borderRadius: "100px", fontSize: "14px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  مشاهده محصولات
                </a>
              </div>
            </div>
          ) : loading ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌿</div>
              <p style={{ color: "var(--light)", fontSize: "14px", fontWeight: "300" }}>داره روتین شخصی شما رو می‌سازه...</p>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: "4px", marginBottom: "32px" }}>
                {questions.map((_, i) => (
                  <div key={i} style={{ height: "2px", flex: 1, borderRadius: "100px", background: i <= current ? "var(--sage)" : "var(--cream-dark)", transition: "background 0.3s" }} />
                ))}
              </div>

              <p style={{ fontSize: "12px", color: "var(--light)", marginBottom: "12px", letterSpacing: "0.06em" }}>
                سوال {current + 1} از {questions.length}
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "24px", color: "var(--dark)", marginBottom: "28px", lineHeight: "1.4" }}>
                {questions[current].question}
              </h2>

              <div>
                {questions[current].options.map((option) => (
                  <button key={option} onClick={() => handleAnswer(option)} style={btnStyle}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}