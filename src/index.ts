import TelegramBot from "node-telegram-bot-api";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_TOKEN: string | undefined = process.env.TELEGRAM_TOKEN;
const OLLAMA_HOST: string = process.env.OLLAMA_HOST || "http://localhost:11434";

if (!TELEGRAM_TOKEN) {
    console.error("❌ TELEGRAM_TOKEN not found");
    process.exit(1);
}

const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });


async function askOllama(prompt: any) {
    try {
        const response: AxiosResponse = await axios.post(`${OLLAMA_HOST}/api/generate`, {
            model: "llama3",
            prompt,
            stream: false
        });
        return response.data.response;
    } catch (err) {
        console.error(err);
        return "Errore nel contattare Ollama.";
    }
}


bot.on("message", async (msg) => {
    const chatId: number = msg.chat.id;
    const text: string | undefined = msg.text;

    if (!text || text.startsWith("/")) return;

    // Risposta generata da Ollama
    const reply: any = await askOllama(text);

    bot.sendMessage(chatId, reply);
});

console.log("🤖 Bot avviato con Node.js + Ollama!");
