import { GatewayIntentBits } from "discord.js";
import { loadEvents } from "./handlers/eventHandler.js";
import { loadCommands } from "./handlers/commandHandler.js";
import { connectMongo } from "./database/mongo.js";
import 'dotenv/config'
import { ExtendedClient } from "./structures/ExtendedClient.js";

const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildInvites,
  ],
});

await connectMongo();
await loadEvents(client);
await loadCommands(client);

client.login(process.env.TOKEN);
