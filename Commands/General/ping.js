const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🏓 Pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  execute(interaction) {
    interaction.reply({ content: "🏓 Pong", ephermal: true });
  },
};
