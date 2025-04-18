import { ActivityType } from "discord.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { Event } from "../../structures/Event.js";
import { loadCommands } from "../../handlers/commandHandler.js";

export default new Event(
  "ready",
  true,
  async (client: ExtendedClient) => {
    console.log(`🤖 Bot online como ${client.user?.tag}`);

    try {
      await loadCommands(client);
    } catch (error) {
      console.error("Erro ao carregar comandos:", error);
    }

    client.user?.setPresence({
      activities: [
        {
          name: "Six",
          type: ActivityType.Listening,
        },
      ],
      status: "idle",
    });
  }
);
