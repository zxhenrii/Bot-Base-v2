import { CommandInteraction, GuildTextBasedChannel } from "discord.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import GuildModel from "../../database/schemas/GuildConfig.js";
const cooldowns = new Map<string, number>();

export default {
  name: "interactionCreate",
  once: false,

  async execute(interaction: CommandInteraction, client: ExtendedClient) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command || !command.execute) return;

    const guildId = interaction.guild?.id;
    const userId = interaction.user.id;
    const cooldownKey = `${command.name}-${userId}`;

    let guildData = await GuildModel.findOne({ guildId });
    if (!guildData) {
      guildData = await GuildModel.create({ guildId });
      console.log(`📦 Guilda ${guildId} registrada no banco de dados.`);
    }

    const cooldown = 3000;
    const lastUsed = cooldowns.get(cooldownKey);
    if (lastUsed && Date.now() - lastUsed < cooldown) {
      const remaining = ((cooldown - (Date.now() - lastUsed)) / 1000).toFixed(1);
      return interaction.reply({
        content: `⏳ Aguarde \`${remaining}s\` antes de usar esse comando novamente.`,
        ephemeral: true
      });
    }
    cooldowns.set(cooldownKey, Date.now());

    try {
      await interaction.deferReply();
      if (!interaction.guild) return;
      
      const channel = interaction.channel;
      if (!channel || !channel.isTextBased() || !("guild" in channel)) return;
      
      await command.execute(
        client,
        interaction.guild,
        interaction.user,
        channel as GuildTextBasedChannel,
        interaction
      );
      
      
    } catch (error) {
      console.error(`❌ Erro ao executar o comando ${command.name}:`, error);
      if (!interaction.replied) {
        await interaction.reply({ content: "❌ Ocorreu um erro ao executar este comando.", ephemeral: true });
      }
    }
  }
};
