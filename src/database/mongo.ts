import mongoose from "mongoose";
import { config } from "dotenv";
config();

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.URI!);
    console.log("✅ MongoDB conectado com sucesso.");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  }
}
