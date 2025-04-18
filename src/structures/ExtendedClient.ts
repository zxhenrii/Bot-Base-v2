import { Client, Collection } from "discord.js";
import { Command } from "./Command.js";

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;
  public slashCommands: Collection<string, Command>;

  constructor(options: any) {
    super(options);

    this.commands = new Collection();
    this.slashCommands = new Collection();
  }
}
