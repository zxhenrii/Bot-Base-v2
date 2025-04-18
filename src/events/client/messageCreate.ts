import { Event } from "../../structures/Event.js";
import { getPrefix } from "../../utils/getPrefix.js";
import { Message, TextChannel } from "discord.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import GuildModel from "../../database/schemas/GuildConfig.js";

export default new Event("messageCreate", false, async (client: ExtendedClient, message: Message) => {
  if (message.author.bot || !message.guild || !message.content) return;

  const guildId = message.guild.id;

  let guildData = await GuildModel.findOne({ guildId });
  if (!guildData) {
    guildData = await GuildModel.create({ guildId });
    console.log(`📦 Guilda ${guildId} registrada no banco de dados.`);
  }

  const prefix = await getPrefix(guildId);
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const cmdName = args.shift()?.toLowerCase();
  if (!cmdName) return;

  const command =
    client.commands.get(cmdName) ||
    [...client.commands.values()].find(cmd => cmd.prefix && cmd.aliases?.includes(cmdName));

  if (!command || !command.prefix) return;

  const channel = message.channel;
  if (!channel.isTextBased() || !("guild" in channel)) return;

  try {
    await command.execute(
      client,
      message.guild,
      message.author,
      channel as TextChannel,
      [cmdName, ...args]
    );
  } catch (err) {
    console.error(`❌ Erro ao executar o comando "${cmdName}":`, err);

    if (channel.isTextBased()) {
      (channel as TextChannel).send({
        content: "❌ Ocorreu um erro ao executar este comando.",
      });
    }
  }
});
