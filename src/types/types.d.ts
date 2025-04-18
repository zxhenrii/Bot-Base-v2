import { Collection } from "discord.js";
import { Command } from "../structures/Command";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}

import CustomClient from "../structures/CustomClient";
export type { CustomClient };
