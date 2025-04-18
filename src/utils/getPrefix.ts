import GuildConfig from "../database/schemas/GuildConfig.js";

export async function getPrefix(guildId: string): Promise<string> {
  const config = await GuildConfig.findOne({ guildId });
  return config?.prefix || "!";
}
