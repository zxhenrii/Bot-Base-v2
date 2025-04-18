import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  GuildTextBasedChannel,
  User,
  Client,
  Guild
} from "discord.js";

export interface ICommand {
  name: string;
  description: string;
  aliases?: string[];
  roles?: string[];
  shortPrefixes?: string[];
  slash?: boolean;
  prefix?: boolean;
  db?: boolean;
  slashData?: ChatInputApplicationCommandData;
  execute: (
    client: Client,
    guild: Guild,
    user: User,
    channel: GuildTextBasedChannel,
    data: CommandInteraction | string[]
  ) => Promise<void>;
}
