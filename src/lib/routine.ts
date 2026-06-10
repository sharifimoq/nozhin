export type RoutinePath = "skin" | "health" | "sport";

export function buildRoutine(path: RoutinePath, answers: string[]): string {
  if (path === "skin") return buildSkinRoutine(answers);
  if (path === "health") return buildHealthRoutine(answers);
  if (path === "sport") return buildSportRoutine(answers);
  return buildHealthRoutine(answers);
}

function buildSkinRoutine(answers: string[]): string {
  const [skinType, concern, age, _currentRoutine, budget] = answers;

  const cleanser =
    skinType === "چرب" || skinType === "مختلط"
      ? "فوم شستشو CeraVe Foaming (پاک‌سازی عمیق بدون تخریب سد پوستی)"
      : "ژل شستشو ملایم Cetaphil (مناسب پوست خشک و حساس)";

  const toner =
    skinType === "چرب" || skinType === "مختلط"
      ? "تونر Niacinamide 10% (کاهش منافذ و تنظیم چربی)"
      : "تونر آبرسان هیالورونیک اسید (آبرسانی فوری)";

  const serum = (() => {
    if (concern === "جوش و آکنه") return "سرم Niacinamide + Zinc (ضدجوش و ضدالتهاب)";
    if (concern === "چین و چروک") return "سرم رتینول ۰.۵٪ CeraVe (ضدچروک و تجدید سلولی)";
    if (concern === "لک و تیرگی") return "سرم ویتامین C 20% The Ordinary (روشن‌کننده و ضدلک)";
    if (concern === "خشکی و پوسته‌پوسته") return "سرم هیالورونیک اسید (آبرسانی عمیق)";
    return "سرم ویتامین C 20% The Ordinary (روشن‌کننده و آنتی‌اکسیدان)";
  })();

  const moisturizer =
    skinType === "خشک"
      ? "کرم مرطوب‌کننده غنی Cetaphil Cream (آبرسانی ۲۴ ساعته)"
      : "کرم مرطوب‌کننده سبک Cetaphil Lotion";

  const nightExtra =
    concern === "چین و چروک" || age === "بالای ۴۰"
      ? "رتینول ۰.۵٪ CeraVe (۲-۳ شب در هفته)"
      : concern === "لک و تیرگی"
      ? "سرم ویتامین C (هر شب)"
      : "مرطوب‌کننده غنی‌تر شبانه";

  const budgetNote =
    budget === "زیر ۲۰۰ هزار"
      ? "💡 نکته بودجه: با اولویت‌دهی به ضدآفتاب و مرطوب‌کننده شروع کن."
      : budget === "بیشتر از یک میلیون"
      ? "💡 با این بودجه می‌تونی سرم رتینول و ویتامین C رو هر دو داشته باشی."
      : "";

  return `🌿 *روتین پوستی شخصی‌سازی‌شده*
نوع پوست: ${skinType} | نگرانی: ${concern}

━━━ روتین صبح ━━━

۱. ${cleanser}
۲. ${toner}
۳. ${serum}
۴. ${moisturizer}
۵. ضدآفتاب SPF50+ Bioderma (آخرین مرحله)

━━━ روتین شب ━━━

۱. میسلار واتر Garnier
۲. ${cleanser}
۳. ${toner}
۴. ${nightExtra}
۵. ${moisturizer}

━━━ هفته‌ای یه بار ━━━

- ماسک هیالورونیک اسید
${skinType === "چرب" ? "- ماسک گِلی برای پاک‌سازی منافذ" : ""}

⚠️ ضدآفتاب رو هر روز، حتی روزهای ابری استفاده کن
${budgetNote}`;
}

function buildHealthRoutine(answers: string[]): string {
  const [gender, goal, lifestyle, _budget] = answers;

  const core = (() => {
    if (goal === "انرژی و نشاط بیشتر")
      return [
        "ویتامین B کمپلکس — هر صبح با صبحانه",
        "ویتامین D3 2000 IU — هر صبح",
        "منیزیم ۴۰۰ میلی‌گرم — شب قبل از خواب",
        "امگا ۳ ۱۲۰۰ میلی‌گرم — با ناهار",
      ];
    if (goal === "تقویت سیستم ایمنی")
      return [
        "ویتامین C 1000 میلی‌گرم — هر صبح",
        "زینک ۵۰ میلی‌گرم — هر شب با غذا",
        "ویتامین D3 2000 IU — هر صبح",
        "امگا ۳ — هر روز با غذا",
      ];
    if (goal === "بهبود خواب")
      return [
        "منیزیم گلیسینات ۴۰۰ میلی‌گرم — ۳۰ دقیقه قبل خواب",
        "ویتامین D3 — صبح",
        "امگا ۳ — با شام",
        "زینک — شب با غذا",
      ];
    if (goal === "سلامت پوست و مو")
      return [
        "بیوتین ۱۰۰۰۰ میکروگرم — هر صبح",
        "کلاژن پپتید ۵۰۰۰ میلی‌گرم — صبح ناشتا",
        "ویتامین C 1000 میلی‌گرم — صبح",
        "امگا ۳ — با غذا",
      ];
    return [
      "مولتی ویتامین — هر صبح با صبحانه",
      "امگا ۳ — با ناهار",
      "ویتامین D3 — هر صبح",
    ];
  })();

  const lifestyleNote = (() => {
    if (lifestyle === "پشت میزنشین")
      return "⚡ ویتامین D3 و منیزیم رو جدی بگیر — اکثر پشت‌میزنشین‌ها کمبود دارن.";
    if (lifestyle === "پر از استرس")
      return "⚡ منیزیم + B کمپلکس مهم‌ترین ترکیبت هستن.";
    if (lifestyle === "خواب نامنظم")
      return "⚡ منیزیم ۴۰۰ میلی‌گرم قبل خواب + قطع کافئین بعد از ۲ بعدازظهر.";
    return "";
  })();

  const genderNote =
    gender === "زن"
      ? "👩 پیشنهاد اضافه: آهن ۱۸ میلی‌گرم + فولیک اسید ۴۰۰ میکروگرم"
      : "👨 پیشنهاد اضافه: زینک ۵۰ میلی‌گرم";

  return `💊 *روتین سلامتی شخصی‌سازی‌شده*
هدف: ${goal} | سبک زندگی: ${lifestyle}

━━━ مکمل‌های روزانه ━━━

${core.map((item, i) => `${i + 1}. ${item}`).join("\n")}

━━━ اضافه پیشنهادی ━━━

${genderNote}

⚠️ مکمل‌های چربی‌محلول (D، امگا ۳) رو با غذا بخور
⚠️ بعد از ۳ ماه آزمایش خون بده
${lifestyleNote}`;
}

function buildSportRoutine(answers: string[]): string {
  const [goal, experience, days, _budget] = answers;

  const supplements = (() => {
    if (goal === "افزایش حجم عضله") {
      return {
        essential: [
          "پروتئین وی Gold Standard ON — بعد تمرین",
          "کراتین مونوهیدرات Creapure — ۵ گرم روزانه",
          "کربوهیدرات سریع — بلافاصله بعد تمرین",
        ],
        optional: [
          "گلوتامین ۵ گرم — قبل خواب",
          "ZMA — شب",
        ],
      };
    }
    if (goal === "کات و چربی‌سوزی") {
      return {
        essential: [
          "ایزوله پروتئین وی Dymatize ISO100 — بعد تمرین",
          "BCAA 2:1:1 — حین تمرین",
          "ال‌کارنیتین مایع — ۳۰ دقیقه قبل تمرین",
        ],
        optional: [
          "کافئین ۲۰۰ میلی‌گرم — قبل تمرین",
          "CLA — با وعده‌های غذایی",
        ],
      };
    }
    if (goal === "استقامت و تناسب اندام") {
      return {
        essential: [
          "BCAA 2:1:1 MuscleTech — حین تمرین طولانی",
          "مولتی ویتامین ورزشی — هر روز صبح",
          "امگا ۳ — روزانه",
        ],
        optional: [
          "بتا-آلانین — قبل تمرین",
          "الکترولیت — حین تمرین بیشتر از ۶۰ دقیقه",
        ],
      };
    }
    return {
      essential: ["BCAA 2:1:1 — حین تمرین", "پروتئین وی — بعد تمرین", "گلوتامین — قبل خواب"],
      optional: ["امگا ۳ — روزانه", "ویتامین D3 — صبح"],
    };
  })();

  const preWorkout =
    experience === "پیشرفته (بیشتر از ۲ سال)"
      ? "پری‌ورکاوت C4 Original — ۲۰ دقیقه قبل تمرین"
      : "قهوه طبیعی یا چای سبز — برای مبتدی و متوسط کافیه";

  const timingNote =
    days === "۵ روز یا بیشتر"
      ? "🔄 با این حجم تمرین: ریکاوری مهم‌ترین چیزه. خواب ۸ ساعت + گلوتامین."
      : days === "۱ تا ۲ روز"
      ? "💡 با ۲ روز تمرین: پروتئین از غذا + کراتین کافیه."
      : "";

  return `💪 *روتین ورزشی شخصی‌سازی‌شده*
هدف: ${goal} | تجربه: ${experience}

━━━ زمان‌بندی مکمل‌ها ━━━

قبل تمرین:
- ${preWorkout}

بعد تمرین:
${supplements.essential.map((s, i) => `${i + 1}. ${s}`).join("\n")}

━━━ مکمل‌های اختیاری ━━━

${supplements.optional.map((s) => `- ${s}`).join("\n")}

⚠️ پروتئین روزانه: ۱.۶-۲.۲ گرم به ازای هر کیلو وزن
⚠️ بدون خواب کافی هیچ مکملی کار نمی‌کنه
${timingNote}`;
}
