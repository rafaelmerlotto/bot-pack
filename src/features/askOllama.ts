import axios, { AxiosResponse } from "axios";

const OLLAMA_HOST: string = process.env.OLLAMA_HOST || "http://localhost:11434";


export async function askOllama(prompt: any) {
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