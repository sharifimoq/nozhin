"use client";
import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "نوع پوستت چیه؟",
    options: ["چرب", "خشک", "مختلط", "حساس", "نمی‌دونم"],
  },
  {
    id: 2,
    question: "بزرگترین نگرانی پوستت چیه؟",
    options: ["جوش و آکنه", "چین و چروک", "لک و تیرگی", "خشکی و پوسته‌پوسته", "منافذ باز"],
  },
  {
    id: 3,
    question: "سنت چقدره؟",
    options: ["زیر ۲۰", "۲۰ تا ۳۰", "۳۰ تا ۴۰", "بالای ۴۰"],
  },
  {
    id: 4,
    question: "هدفت از مکمل چیه؟",
    options: ["انرژی بیشتر", "تقویت ایمنی", "سلامت پوست و مو", "کاهش وزن", "تقویت عضله"],
  },
  {
    id: 5,
    question: "سبک زندگیت چطوره؟",
    options: ["پشت میزنشین", "فعال و ورزشکار", "استرس زیاد", "خواب نامنظم"],
  },
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
      // همه سوالا تموم شد — بفرست به Claude
      setLoading(true);
      const response = await fetch("/api/routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: newAnswers,
          questions: questions.map((q) => q.question),
        }),
      });
      const data = await response.json();
setResult(data.routine);

// اگه کاربر لاگین کرده، روتین رو ذخیره کن
await fetch("/api/routine/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    answers: newAnswers,
    result: data.routine,
  }),
});

setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-rose-50 flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-lg w-full mx-4">

        {/* نتیجه */}
        {result ? (
          <div>
            <h2 className="text-2xl font-bold text-rose-500 mb-6 text-center">
              روتین شخصی شما 🌸
            </h2>
            <div className="text-gray-700 leading-8 whitespace-pre-line">
              {result}
            </div>
            <button
              onClick={() => { setResult(""); setCurrent(0); setAnswers([]); }}
              className="mt-8 w-full bg-rose-500 text-white py-3 rounded-full hover:bg-rose-600"
            >
              دوباره امتحان کن
            </button>
          </div>
        ) : loading ? (
          /* لودینگ */
          <div className="text-center py-12">
            <div className="text-5xl mb-4 animate-bounce">🤖</div>
            <p className="text-gray-500">داره روتین شخصی شما رو می‌سازه...</p>
          </div>
        ) : (
          /* سوالات */
          <div>
            {/* پروگرس بار */}
            <div className="flex gap-1 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i <= current ? "bg-rose-500" : "bg-rose-100"}`}
                />
              ))}
            </div>

            <p className="text-sm text-rose-400 mb-2">
              سوال {current + 1} از {questions.length}
            </p>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {questions[current].question}
            </h2>

            <div className="flex flex-col gap-3">
              {questions[current].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="text-right px-5 py-3 rounded-xl border-2 border-rose-100 hover:border-rose-500 hover:bg-rose-50 text-gray-700 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}