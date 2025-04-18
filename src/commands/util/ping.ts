import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  GuildTextBasedChannel,
  PermissionsBitField,
  User,
  Client,
  Guild
} from "discord.js";
import { Command } from "../../structures/Command.js";

export default new Command({
  name: "ping",
  description: "Responde com pong!",
  aliases: ["latency"],
  shortPrefixes: ["p"],
  slash: true,
  prefix: true,
  db: false,
  slashData: {
    name: "ping",
    description: "Responde com pong!"
  } satisfies ChatInputApplicationCommandData,

  async execute(client, guild, user, channel, data) {
    if (data instanceof CommandInteraction) {
      await data.reply("🏓 Pong!");
    } else {
      await channel.send("🏓 Pong!");
    }
  }
});
