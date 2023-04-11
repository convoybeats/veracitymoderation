const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("📈 Shows you the uptime of the bot."),

  async execute(interaction, client, member) {
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username}'s uptime.`)
      .setColor("#ff6200")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      })
      .setTimestamp()
      .addFields({
        name: "**Uptime:**",
        value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds.`,
      });

    interaction.reply({ embeds: [embed] });
  },
};
