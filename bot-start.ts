import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const { default: bot } = await import("./src/bot/index");

  console.log("🤖 نوژین ربات در حال اجراست (polling mode)...");
  await bot.launch();
  console.log("✅ ربات اجرا شد. برای توقف Ctrl+C بزن.");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main().catch(console.error);
