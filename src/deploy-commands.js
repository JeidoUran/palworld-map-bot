import "dotenv/config";
import { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

const commands = [
  new SlashCommandBuilder()
    .setName("palmap")
    .setDescription("Configurer la carte Palworld (snapshot).")
    .addSubcommand(sc =>
      sc
        .setName("add")
        .setDescription("Attacher la live-map à un canal (un seul message édité).")
        .addChannelOption(opt =>
          opt
            .setName("channel")
            .setDescription("Canal où poster/éditer la carte")
            .setRequired(true)
        )
    )
    .addSubcommand(sc =>
      sc
        .setName("remove")
        .setDescription("Détacher la live-map de ce serveur (arrête les updates).")
    )
    .addSubcommand(sc =>
      sc
        .setName("status")
        .setDescription("Voir la config actuelle de la live-map sur ce serveur.")
    )
    .addSubcommand(sc =>
      sc
        .setName("force")
        .setDescription("Forcer un refresh immédiat (même si rien n’a changé).")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Deploying slash commands...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("✅ Commands deployed.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
