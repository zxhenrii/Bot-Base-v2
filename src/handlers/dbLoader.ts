import mongoose from "mongoose";
import 'dotenv/config'

export async function dbLoader() {
  try {
    await mongoose.connect(process.env.URI!);
    console.log("📦 Conectado ao MongoDB com sucesso.");
  } catch (error) {
    console.error("❌ Falha na conexão com MongoDB:", error);
  }
}
