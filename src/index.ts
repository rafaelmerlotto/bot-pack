import { askOllama } from "./features/askOllama";
import { bot } from "./bots/telegram";



bot.on("message", async (msg) => {
    const chatId: number = msg.chat.id;
    const text: string | undefined = msg.text;

    if (!text || text.startsWith("/")) return;

    // Risposta generata da Ollama
    const reply: any = await askOllama(text);

    bot.sendMessage(chatId, reply);
});

console.log("🤖 Bot avviato con Node.js + Ollama!");
