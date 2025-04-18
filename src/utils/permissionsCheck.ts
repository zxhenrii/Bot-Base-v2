import { GuildMember, PermissionsBitField } from "discord.js";

export function hasPermissions(member: GuildMember, permissions: bigint[]) {
  return permissions.every(p => member.permissions.has(p));
}
