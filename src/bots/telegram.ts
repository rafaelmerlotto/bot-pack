import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const TELEGRAM_TOKEN: string | undefined = process.env.TELEGRAM_TOKEN;

if (!TELEGRAM_TOKEN) {
    console.error("❌ TELEGRAM_TOKEN not found");
    process.exit(1);
}

export const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
