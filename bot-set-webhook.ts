import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const token = process.env.TELEGRAM_BOT_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!token || !baseUrl) {
  console.error("❌ TELEGRAM_BOT_TOKEN و NEXT_PUBLIC_BASE_URL باید در .env.local باشن");
  process.exit(1);
}

const webhookUrl = `${baseUrl}/api/telegram`;

async function setWebhook() {
  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });
  const data = await res.json();
  if (data.ok) {
    console.log(`✅ Webhook تنظیم شد:\n${webhookUrl}`);
  } else {
    console.error("❌ خطا:", data.description);
  }
}

setWebhook().catch(console.error);
