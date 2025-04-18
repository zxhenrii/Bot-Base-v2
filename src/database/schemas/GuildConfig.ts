import { Schema, model } from "mongoose";

const guildConfigSchema = new Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: "!" }
});

export default model("GuildConfig", guildConfigSchema);
