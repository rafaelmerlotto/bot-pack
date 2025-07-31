import { Client, LocalAuth } from "whatsapp-web.js";

export const client: Client = new Client({ authStrategy: new LocalAuth() });


