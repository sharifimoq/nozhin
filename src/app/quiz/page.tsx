"use client";
import { useState } from "react";

const s = {
  cream: '#FAFAF8',
  greenDark: '#1A3A2A',
  greenMid: '#2D6A4F',
  greenLight: '#52B788',
  greenPale: '#D8F3DC',
  text: '#1C1C1A',
  textMuted: '#5A5A56',
  border: 'rgba(26, 58, 42, 0.12)',
}

type Path = 'skin' | 'health' | 'sport'

const paths = [
  {
    id: 'skin' as Path,
    icon: '🌿',
    title: 'روتین پوستی',
    desc: 'مراقبت شخصی‌سازی‌شده برای پوست',
    color: s.greenPale,
  },
  {
    id: 'health' as Path,
    icon: '💊',
    title: 'روتین سلامتی',
    desc: 'مکمل‌های روزانه برای سلامت عمومی',
    color: '#FFF8E7',
  },
  {
    id: 'sport' as Path,
    icon: '💪',
    title: 'روتین ورزشی',
    desc: 'مکمل‌های تخصصی برای ورزشکاران',
    color: '#E8F4FD',
  },
]

const questions: Record<Path, { question: string; options: string[] }[]> = {
  skin: [
    { question: 'نوع پوستت چیه؟', options: ['چرب', 'خشک', 'مختلط', 'حساس', 'نمی‌دونم'] },
    { question: 'بزرگترین نگرانی پوستت چیه؟', options: ['جوش و آکنه', 'چین و چروک', 'لک و تیرگی', 'خشکی و پوسته‌پوسته', 'منافذ باز'] },
    { question: 'سنت چقدره؟', options: ['زیر ۲۰', '۲۰ تا ۳۰', '۳۰ تا ۴۰', 'بالای ۴۰'] },
    { question: 'روتین فعلیت چیه؟', options: ['هیچی استفاده نمی‌کنم', 'فقط کرم مرطوب‌کننده', 'چند محصول دارم', 'روتین کامل دارم'] },
    { question: 'بودجه ماهیانه‌ات برای پوست؟', options: ['زیر ۲۰۰ هزار', '۲۰۰ تا ۵۰۰ هزار', '۵۰۰ تا یک میلیون', 'بیشتر از یک میلیون'] },
  ],
  health: [
    { question: 'جنسیتت چیه؟', options: ['زن', 'مرد'] },
    { question: 'هدف اصلیت چیه؟', options: ['انرژی و نشاط بیشتر', 'تقویت سیستم ایمنی', 'بهبود خواب', 'سلامت پوست و مو', 'کنترل وزن'] },
    { question: 'سبک زندگیت چطوره؟', options: ['پشت میزنشین', 'نیمه فعال', 'پر از استرس', 'خواب نامنظم'] },
    { question: 'بودجه ماهیانه‌ات برای مکمل؟', options: ['زیر ۱۵۰ هزار', '۱۵۰ تا ۴۰۰ هزار', '۴۰۰ تا ۸۰۰ هزار', 'بیشتر از ۸۰۰ هزار'] },
  ],
  sport: [
    { question: 'هدف ورزشیت چیه؟', options: ['افزایش حجم عضله', 'کات و چربی‌سوزی', 'استقامت و تناسب اندام', 'ریکاوری سریع‌تر'] },
    { question: 'چقدر تجربه داری؟', options: ['مبتدی (کمتر از ۶ ماه)', 'متوسط (۶ ماه تا ۲ سال)', 'پیشرفته (بیشتر از ۲ سال)'] },
    { question: 'چند روز در هفته تمرین می‌کنی؟', options: ['۱ تا ۲ روز', '۳ تا ۴ روز', '۵ روز یا بیشتر'] },
    { question: 'بودجه ماهیانه‌ات برای مکمل؟', options: ['زیر ۳۰۰ هزار', '۳۰۰ تا ۷۰۰ هزار', '۷۰۰ هزار تا یک و نیم میلیون', 'بیشتر'] },
  ],
}

const pathLabels: Record<Path, string> = {
  skin: 'روتین پوستی',
  health: 'روتین سلامتی',
  sport: 'روتین ورزشی',
}

export default function Quiz() {
  const [selectedPath, setSelectedPath] = useState<Path | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const currentQuestions = selectedPath ? questions[selectedPath] : []

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (current < currentQuestions.length - 1) {
      setCurrent(current + 1)
    } else {
      setLoading(true)
      const response = await fetch('/api/routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: newAnswers,
          questions: currentQuestions.map((q) => q.question),
          path: selectedPath,
        }),
      })
      const data = await response.json()
      setResult(data.routine)
      await fetch('/api/routine/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers, result: data.routine }),
      })
      setLoading(false)
    }
  }

  const reset = () => {
    setSelectedPath(null)
    setCurrent(0)
    setAnswers([])
    setResult('')
  }

  return (
    <main style={{
      minHeight: '100vh', background: s.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Vazirmatn', sans-serif", direction: 'rtl', padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>

        {/* لوگو */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <a href="/" style={{ textDecoration: 'none', fontSize: 26, fontWeight: 900, color: s.greenDark }}>
            نوژ<span style={{ color: s.greenLight }}>ین</span>
          </a>
        </div>

        <div style={{
          background: 'white', borderRadius: 24,
          border: `1px solid ${s.border}`, padding: '40px 36px',
          boxShadow: '0 4px 32px rgba(26,58,42,0.06)',
        }}>

          {/* نتیجه */}
          {result ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{
                  background: s.greenPale, color: s.greenMid, fontSize: 11,
                  fontWeight: 700, padding: '6px 16px', borderRadius: 50,
                  display: 'inline-block', marginBottom: 16, letterSpacing: 1,
                }}>
                  ✦ روتین شخصی شما آماده‌ست
                </div>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: s.greenDark }}>
                  {pathLabels[selectedPath!]}
                </h2>
              </div>
              <div style={{
                fontSize: 14, color: s.textMuted, lineHeight: 2,
                whiteSpace: 'pre-line', background: s.cream,
                borderRadius: 16, padding: 24, marginBottom: 24,
              }}>
                {result}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={reset} style={{
                  flex: 1, background: 'transparent', color: s.greenMid,
                  border: `1px solid ${s.greenMid}`, padding: '12px', borderRadius: 50,
                  fontSize: 13, fontWeight: 600, fontFamily: "'Vazirmatn', sans-serif", cursor: 'pointer',
                }}>
                  دوباره امتحان کن
                </button>
                <a href="/products" style={{
                  flex: 1, background: s.greenDark, color: 'white',
                  padding: '12px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                  textAlign: 'center', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  مشاهده محصولات
                </a>
              </div>
            </div>

          ) : loading ? (
            <div style={{ textAlign: 'center', padding: '56px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 20 }}>🌿</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.greenDark, marginBottom: 8 }}>
                در حال ساخت روتین شخصی شما...
              </div>
              <div style={{ fontSize: 13, color: s.textMuted }}>چند لحظه صبر کن</div>
            </div>

          ) : !selectedPath ? (
            /* انتخاب مسیر */
            <div>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{
                  background: s.greenPale, color: s.greenMid, fontSize: 11,
                  fontWeight: 700, padding: '6px 16px', borderRadius: 50,
                  display: 'inline-block', marginBottom: 16, letterSpacing: 1,
                }}>
                  شروع
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: s.greenDark, marginBottom: 8 }}>
                  دنبال چی هستی؟
                </h2>
                <p style={{ fontSize: 13, color: s.textMuted, lineHeight: 1.7 }}>
                  یکی رو انتخاب کن تا سوالات مخصوص بهت نشون بدیم
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {paths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPath(path.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '20px 20px', borderRadius: 16,
                      border: `1px solid ${s.border}`, background: 'white',
                      cursor: 'pointer', textAlign: 'right',
                      fontFamily: "'Vazirmatn', sans-serif",
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = s.greenLight}
                    onMouseLeave={e => e.currentTarget.style.borderColor = s.border}
                  >
                    <div style={{
                      width: 52, height: 52, background: path.color,
                      borderRadius: 14, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 24, flexShrink: 0,
                    }}>
                      {path.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: s.text, marginBottom: 4 }}>
                        {path.title}
                      </div>
                      <div style={{ fontSize: 12, color: s.textMuted }}>
                        {path.desc}
                      </div>
                    </div>
                    <div style={{ color: s.textMuted, fontSize: 18 }}>←</div>
                  </button>
                ))}
              </div>
            </div>

          ) : (
            /* سوالات */
            <div>
              {/* progress bar */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
                {currentQuestions.map((_, i) => (
                  <div key={i} style={{
                    height: 3, flex: 1, borderRadius: 100,
                    background: i <= current ? s.greenLight : s.greenPale,
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>

              {/* مسیر و شماره سوال */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <button onClick={reset} style={{
                  background: 'none', border: 'none', color: s.textMuted,
                  fontSize: 12, cursor: 'pointer', fontFamily: "'Vazirmatn', sans-serif",
                }}>
                  ← تغییر مسیر
                </button>
                <div style={{
                  background: s.greenPale, color: s.greenMid, fontSize: 11,
                  fontWeight: 600, padding: '4px 12px', borderRadius: 50,
                }}>
                  {pathLabels[selectedPath]}
                </div>
                <span style={{ fontSize: 12, color: s.textMuted }}>
                  {current + 1} از {currentQuestions.length}
                </span>
              </div>

              <h2 style={{
                fontSize: 22, fontWeight: 900, color: s.greenDark,
                marginBottom: 28, lineHeight: 1.4,
              }}>
                {currentQuestions[current].question}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {currentQuestions[current].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    style={{
                      textAlign: 'right', padding: '14px 20px',
                      borderRadius: 12, border: `1px solid ${s.border}`,
                      background: 'white', fontSize: 14, color: s.text,
                      cursor: 'pointer', fontFamily: "'Vazirmatn', sans-serif",
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = s.greenLight
                      e.currentTarget.style.background = s.greenPale
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = s.border
                      e.currentTarget.style.background = 'white'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}