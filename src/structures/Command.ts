import { ICommand } from "../types/CommandOptions.js";

export class Command {
  public name: string;
  public description: string;
  public aliases: string[];
  public roles: string[];
  public shortPrefixes: string[];
  public slash: boolean;
  public prefix: boolean;
  public db: boolean;
  public slashData: any;
  public execute: ICommand["execute"];

  constructor(options: ICommand) {
    this.name = options.name;
    this.description = options.description;
    this.aliases = options.aliases || [];
    this.roles = options.roles || [];
    this.shortPrefixes = options.shortPrefixes || [];
    this.slash = options.slash ?? true;
    this.prefix = options.prefix ?? true;
    this.db = options.db ?? false;
    this.slashData = options.slashData;
    this.execute = options.execute;
  }
}
