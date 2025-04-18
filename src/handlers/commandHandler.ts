import { readdir } from "fs/promises";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";
import { ExtendedClient } from "../structures/ExtendedClient.js";
import { Command } from "../structures/Command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isTs = __dirname.includes("/src") || __dirname.includes("\\src");

export async function loadCommands(client: ExtendedClient) {
  const commandsPath = path.join(__dirname, "..", "commands");
  const folders = await readdir(commandsPath);

  for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);
    const files = await readdir(folderPath);

    for (const file of files) {
      if (!file.endsWith(isTs ? ".ts" : ".js")) continue;

      const filePath = pathToFileURL(path.join(folderPath, file)).href;
      const imported = await import(filePath);
      const command = imported.default;

      if (!command || !(command instanceof Command)) continue;

      // Prefix commands
      if (command.prefix) {
        client.commands.set(command.name, command);
        if (command.aliases?.length) {
          for (const alias of command.aliases) {
            client.commands.set(alias, command);
          }
        }
      }

      // Slash commands
      if (command.slash) {
        client.slashCommands.set(command.name, command);
      }
    }
  }

  console.log(`🔧 Carregados ${client.commands.size} prefix e ${client.slashCommands.size} slash comandos.`);
}
