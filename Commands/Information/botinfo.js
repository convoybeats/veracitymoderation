const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const cpuStat = require("cpu-stat");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get information about the bot"),

  execute(interaction, client) {
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;

    cpuStat.usagePercent(function (error, percent) {
      if (error) return interaction.reply({ content: `${error}` });

      const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
      const node = process.version;
      const cpu = percent.toFixed(2);

      const botInfoEmbed = new EmbedBuilder()
        .setTitle("Bot information:")
        .setColor("#ff6200")
        .addFields(
          { name: `Developer`, value: `Convoybeats#0299`, inline: true },
          { name: `Username`, value: `${client.user.username}`, inline: true },
          { name: `ID`, value: `${client.user.id}`, inline: true },
          { name: `Creation date`, value: `22.03.2023`, inline: true },
          {
            name: "Uptime",
            value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds.`,
            inline: true,
          },
          { name: `Bot ping`, value: `${client.ws.ping}ms`, inline: true },
          { name: `Node version`, value: `${node}`, inline: true },
          { name: `Cpu Usage`, value: `${cpu}%`, inline: true },
          { name: `Memory usage`, value: `${memoryUsage}`, inline: true }
        )
        .setFooter({
          text: "Veracity Roleplay",
          iconURL:
            "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
        });

      interaction.reply({ embeds: [botInfoEmbed] });
    });

    function formatBytes(a, b) {
      let c = 1024;
      d = b || 2;
      e = ["B", "KB", "MB", "GB", "TB"];
      f = Math.floor(Math.log(a) / Math.log(c));

      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
    }
  },
};
