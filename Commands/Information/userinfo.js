const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("ℹ Get information about a user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user.").setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const user = options.getUser("user") || interaction.user;
    const member = await interaction.guild.members.cache.get(user.id);
    const icon = user.displayAvatarURL();
    const tag = user.tag;

    const embed = new EmbedBuilder()
      .setColor("#FF6200")
      .setAuthor({ name: tag, iconURL: icon })
      .addFields(
        { name: `Name:`, value: `${user}`, inline: true },
        {
          name: `Roles:`,
          value: `${member.roles.cache.map((r) => r).join(``)}`,
          inline: true,
        },
        {
          name: `Joined server:`,
          value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Joined discord:`,
          value: `<t:${parseInt(member.user.createdAt / 1000)}:R>`,
          inline: true,
        }
      )
      .setFooter({ text: `User ID: ${user.id}` })
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    await interaction.reply({ embeds: [embed] });
  },
};
