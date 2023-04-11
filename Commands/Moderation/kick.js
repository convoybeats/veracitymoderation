const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("➖ Kick a user from the discord server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User that you want to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the kick.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { channel, options } = interaction;

    const user = options.getUser("target");
    const reason = options.getString("reason");

    const member = await interaction.guild.members.fetch(user.id);

    const errEmbed = new EmbedBuilder()
      .setDescription(
        `You can't take actions on ${user.username} since they have a higher role then you.`
      )
      .setColor("#ff6200");

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setDescription(`Succesfully kicked ${user} with reason: ${reason}.`)
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
