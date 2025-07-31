import { askOllama } from "./features/askOllama";
import { bot } from "./bots/telegram";
import { client } from "./bots/whatsapp";
import TelegramBot from "node-telegram-bot-api";
import qrcode from "qrcode-terminal";


// TELEGRAM BOT
bot.on("message", async (msg: TelegramBot.Message) => {
    const chatId: number = msg.chat.id;
    const text: string | undefined = msg.text;

    if (!text || text.startsWith("/")) return;

    // Risposta generata da Ollama
    const reply: any = await askOllama(text);

    bot.sendMessage(chatId, reply);
});

// WHATSAPP BOT
client.on("qr", (qr) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`;
    console.log(qrcode.generate(qrUrl, { small: true }));
    console.log(qrUrl);
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on("message", async (message) => {
    const reply: any = await askOllama(message.body)
    if (reply) {
        await message.reply(reply);
    }
});


client.initialize();


console.log("🤖 Bot is run with Node.js + Ollama!");
