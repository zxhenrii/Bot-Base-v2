import { CommandInteraction, GuildTextBasedChannel, PermissionsBitField, Client, Guild, User } from "discord.js";
import GuildConfig from "../../database/schemas/GuildConfig.js";
import { Command } from "../../structures/Command.js";

export const setprefix: Command = {
  name: "setprefix",
  description: "Altere o prefixo de comandos deste servidor.",
  aliases: [],
  roles: [],
  shortPrefixes: [],
  slash: true,
  prefix: false,
  db: true,
  slashData: {
    name: "setprefix",
    description: "Altere o prefixo de comandos deste servidor.",
    options: [
      {
        name: "prefix",
        type: 3,
        description: "Novo prefixo",
        required: true
      }
    ]
  },
  async execute(
    client: Client,
    guild: Guild,
    user: User,
    channel: GuildTextBasedChannel,
    data: CommandInteraction | string[]
  ): Promise<void> {
    const member = guild.members.cache.get(user.id);
    if (!member?.permissions.has(PermissionsBitField.Flags.Administrator)) {
      if (data instanceof CommandInteraction) {
        await data.reply("❌ Você precisa ser administrador para usar este comando.");
      } else {
        await channel.send("❌ Você precisa ser administrador para usar este comando.");
      }
      return;
    }

    const newPrefix = data instanceof CommandInteraction
      ? data.options.get("prefix")?.value?.toString() ?? "!"
      : data[1];

    await GuildConfig.findOneAndUpdate(
      { guildId: guild.id },
      { prefix: newPrefix },
      { upsert: true }
    );

    if (data instanceof CommandInteraction) {
      await data.reply(`✅ Prefixo alterado para \`${newPrefix}\``);
    } else {
      await channel.send(`✅ Prefixo alterado para \`${newPrefix}\``);
    }
  }
};