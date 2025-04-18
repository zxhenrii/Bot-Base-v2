import { REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import 'dotenv/config'

const commands = [];
const commandsPath = path.join(process.cwd(), "src/commands");
const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
  const commandFiles = fs
    .readdirSync(path.join(commandsPath, folder))
    .filter(file => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, folder, file);
    const commandModule = await import(filePath);
    const command = commandModule.default;

    if (command?.slash && command?.slashData) {
      commands.push(command.slashData);
    } else {
      console.warn(`[AVISO] O comando "${file}" não possui "slashData" ou não é marcado como slash.`);
    }
  }
}

const rest = new REST().setToken(process.env.TOKEN!);

(async () => {
  try {
    console.log("🔃 Atualizando slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    console.log(`✅ ${commands.length} slash commands registrados com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao registrar comandos:", error);
  }
})();
