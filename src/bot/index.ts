import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";
import { buildRoutine, type RoutinePath } from "@/lib/routine";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nozhin.ir";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";

export const bot = BOT_TOKEN ? new Telegraf(BOT_TOKEN) : null;

// ─── Quiz definitions ─────────────────────────────────────────────────────────

const skinQuestions = [
  { q: "نوع پوستت چیه؟", opts: ["چرب", "خشک", "مختلط", "نرمال"] },
  { q: "مهم‌ترین مشکل پوستیت؟", opts: ["جوش و آکنه", "چین و چروک", "لک و تیرگی", "خشکی و پوسته‌پوسته"] },
  { q: "رده سنیت؟", opts: ["زیر ۲۵", "۲۵ تا ۳۵", "۳۵ تا ۴۰", "بالای ۴۰"] },
  { q: "الان روتین پوستی داری؟", opts: ["بله، روتین کامل", "فقط کرم مرطوب‌کننده", "نه، هیچی"] },
  { q: "بودجه ماهیانه‌ات برای مراقبت پوست؟", opts: ["زیر ۲۰۰ هزار", "۲۰۰ تا ۵۰۰ هزار", "۵۰۰ هزار تا یک میلیون", "بیشتر از یک میلیون"] },
];

const healthQuestions = [
  { q: "جنسیتت؟", opts: ["مرد", "زن"] },
  { q: "هدف اصلیت از مکمل؟", opts: ["انرژی و نشاط بیشتر", "تقویت سیستم ایمنی", "بهبود خواب", "سلامت پوست و مو"] },
  { q: "سبک زندگیت چطوره؟", opts: ["پشت میزنشین", "پر از استرس", "فعال و ورزشکار", "خواب نامنظم"] },
  { q: "بودجه ماهیانه برای مکمل؟", opts: ["زیر ۳۰۰ هزار", "۳۰۰ تا ۷۰۰ هزار", "بیشتر از ۷۰۰ هزار"] },
];

const sportQuestions = [
  { q: "هدف ورزشیت؟", opts: ["افزایش حجم عضله", "کات و چربی‌سوزی", "استقامت و تناسب اندام"] },
  { q: "سطح تجربه‌ات؟", opts: ["مبتدی (کمتر از ۶ ماه)", "متوسط (۶ ماه تا ۲ سال)", "پیشرفته (بیشتر از ۲ سال)"] },
  { q: "چند روز در هفته تمرین می‌کنی؟", opts: ["۱ تا ۲ روز", "۳ تا ۴ روز", "۵ روز یا بیشتر"] },
  { q: "بودجه ماهیانه برای مکمل ورزشی؟", opts: ["زیر ۵۰۰ هزار", "۵۰۰ هزار تا یک میلیون", "بیشتر از یک میلیون"] },
];

const pathQuestions: Record<RoutinePath, typeof skinQuestions> = {
  skin: skinQuestions,
  health: healthQuestions,
  sport: sportQuestions,
};

const pathCategory: Record<RoutinePath, string> = {
  skin: "skincare",
  health: "supplement",
  sport: "sport",
};

// ─── Session state ────────────────────────────────────────────────────────────

type Session = {
  path: RoutinePath;
  answers: string[];
  step: number;
};

const sessions = new Map<number, Session>();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function questionKeyboard(opts: string[]) {
  const rows = [];
  for (let i = 0; i < opts.length; i += 2) {
    rows.push(opts.slice(i, i + 2).map((o) => Markup.button.callback(o, `ans:${o}`)));
  }
  return Markup.inlineKeyboard(rows);
}

async function sendQuestion(chatId: number, session: Session) {
  if (!bot) return;
  const questions = pathQuestions[session.path];
  const current = questions[session.step];
  await bot.telegram.sendMessage(
    chatId,
    `سوال ${session.step + 1} از ${questions.length}\n\n${current.q}`,
    { ...questionKeyboard(current.opts), parse_mode: "Markdown" }
  );
}

async function fetchTopProducts(category: string): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/api/products?category=${category}`);
    if (!res.ok) return "";
    const products: Array<{ id: string; name: string; price: number }> = await res.json();
    if (!products.length) return "";

    const top = products.slice(0, 3);
    const lines = top.map(
      (p) =>
        `• [${p.name}](${BASE_URL}/products) — ${p.price.toLocaleString("fa-IR")} تومان`
    );
    return `\n\n *محصولات پیشنهادی از نوژین:*\n${lines.join("\n")}`;
  } catch {
    return "";
  }
}

// ─── Handlers ────────────────────────────────────────────────────────────────

if (bot) {
  bot.start(async (ctx) => {
    sessions.delete(ctx.chat.id);
    await ctx.reply(
      `سلام! خوش اومدی به *نوژین*\n\nمن کمکت می‌کنم یه روتین کاملاً شخصی‌سازی‌شده دریافت کنی.\n\nکدوم مسیر برات مناسب‌تره؟`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("روتین پوستی", "path:skin")],
          [Markup.button.callback("روتین سلامتی", "path:health")],
          [Markup.button.callback("روتین ورزشی", "path:sport")],
        ]),
      }
    );
  });

  bot.help((ctx) =>
    ctx.reply(
      `دستورات ربات نوژین:\n\n/start — شروع کوییز\n/routine — ساخت روتین جدید\n/cancel — لغو کوییز در حال انجام\n\n سایت: ${BASE_URL}`
    )
  );

  bot.command("routine", async (ctx) => {
    sessions.delete(ctx.chat.id);
    await ctx.reply(
      "کدوم روتین می‌خوای بسازی؟",
      Markup.inlineKeyboard([
        [Markup.button.callback("روتین پوستی", "path:skin")],
        [Markup.button.callback("روتین سلامتی", "path:health")],
        [Markup.button.callback("روتین ورزشی", "path:sport")],
      ])
    );
  });

  bot.command("cancel", (ctx) => {
    const had = sessions.has(ctx.chat.id);
    sessions.delete(ctx.chat.id);
    ctx.reply(had ? "کوییز لغو شد. هر وقت خواستی /start بزن." : "کوییز فعالی نداری.");
  });

  bot.action(/^path:(skin|health|sport)$/, async (ctx) => {
    if (!ctx.chat) return ctx.answerCbQuery();
    const chatId = ctx.chat.id;
    const path = ctx.match[1] as RoutinePath;
    const labels: Record<RoutinePath, string> = {
      skin: "روتین پوستی",
      health: "روتین سلامتی",
      sport: "روتین ورزشی",
    };
    await ctx.editMessageText(`انتخاب کردی: *${labels[path]}*\n\nبریم سراغ سوالا!`, {
      parse_mode: "Markdown",
    });

    const session: Session = { path, answers: [], step: 0 };
    sessions.set(chatId, session);
    await sendQuestion(chatId, session);
    await ctx.answerCbQuery();
  });

  bot.action(/^ans:(.+)$/, async (ctx) => {
    if (!ctx.chat) return ctx.answerCbQuery();
    const chatId = ctx.chat.id;
    const answer = ctx.match[1];
    const session = sessions.get(chatId);
    if (!session) {
      await ctx.answerCbQuery("لطفاً با /start شروع کن");
      return;
    }

    session.answers.push(answer);
    await ctx.editMessageText(
      `جواب ${session.step + 1}: *${answer}*`,
      { parse_mode: "Markdown" }
    );
    await ctx.answerCbQuery();

    const questions = pathQuestions[session.path];
    session.step += 1;

    if (session.step < questions.length) {
      await sendQuestion(chatId, session);
    } else {
      sessions.delete(chatId);

      await ctx.telegram.sendMessage(chatId, "در حال ساخت روتین شخصی‌ات...");

      const routine = buildRoutine(session.path, session.answers);
      const products = await fetchTopProducts(pathCategory[session.path]);

      await ctx.telegram.sendMessage(chatId, routine + products, {
        parse_mode: "Markdown",
      });

      await ctx.telegram.sendMessage(
        chatId,
        `برای دیدن همه محصولات و خرید آنلاین:\n${BASE_URL}/products\n\nبرای شروع مجدد: /start`,
      );
    }
  });

  bot.on(message("text"), (ctx) => {
    const session = sessions.get(ctx.chat.id);
    if (session) {
      const questions = pathQuestions[session.path];
      ctx.reply(
        `لطفاً از دکمه‌ها جواب بده\n\n${questions[session.step].q}`,
        questionKeyboard(questions[session.step].opts)
      );
    } else {
      ctx.reply(
        "سلام! برای ساخت روتین شخصی /start بزن",
        Markup.inlineKeyboard([[Markup.button.callback("شروع کوییز", "path:health")]])
      );
    }
  });

  bot.catch((err, ctx) => {
    console.error(`خطا برای آپدیت ${ctx.updateType}:`, err);
  });
}

export default bot;
