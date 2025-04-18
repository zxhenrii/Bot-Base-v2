import { Client } from "discord.js";
import { readdir } from "fs/promises";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isTs = __dirname.includes("/src") || __dirname.includes("\\src");

async function getAllEventFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getAllEventFiles(fullPath);
      files.push(...subFiles);
    } else if (
      entry.isFile() &&
      (isTs ? entry.name.endsWith(".ts") : entry.name.endsWith(".js"))
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, "../events");
  console.log(`📁 Carregando eventos de: ${eventsPath}`);

  const files = await getAllEventFiles(eventsPath);

  if (!files.length) {
    console.warn("⚠️ Nenhum evento encontrado.");
    return;
  }

  for (const file of files) {
    try {
      const fileUrl = pathToFileURL(file).href;
      const eventModule = await import(fileUrl);
      const event = eventModule.default;

      if (!event || !event.name || !event.execute) {
        console.warn(`❌ Evento inválido ignorado: ${file}`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
      }

      console.log(`✅ Evento carregado: ${event.name}`);
    } catch (error) {
      console.error(`💥 Erro ao carregar evento ${file}:`, error);
    }
  }
}
