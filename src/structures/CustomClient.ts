import { Client, ClientOptions, Collection } from "discord.js";
import { Command } from "./Command";
import { Event } from "./Event";

export default class CustomClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();

  constructor(options: ClientOptions) {
    super(options);
  }
}
