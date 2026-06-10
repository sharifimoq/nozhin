import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Must be set before importing bot (bot reads env at module init)
import bot from "./src/bot/index";

async function main() {
  console.log("🤖 نوژین ربات در حال اجراست (polling mode)...");
  await bot.launch();
  console.log("✅ ربات اجرا شد. برای توقف Ctrl+C بزن.");
}

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

main().catch(console.error);
