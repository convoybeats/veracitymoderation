const {
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("🔇 Mute a member from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Select the user you wish to mute.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("How long the mute should last.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the mute.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options } = interaction;

    const user = options.getUser("target");
    const member = guild.members.cache.get(user.id);
    const time = options.getString("time");
    const convertedTime = ms(time);
    const reason = options.getString("reason");

    const errEmbed = new EmbedBuilder()
      .setDescription("Something went wrong, please try again.")
      .setColor("#ff6200");

    const succesEmbed = new EmbedBuilder()
      .setTitle("**✔ Muted**")
      .setDescription(`Succesfully muted ${user}.`)
      .addFields(
        { name: `Reason`, value: `${reason}`, inline: true },
        { name: `Duration`, value: `${time}`, inline: true }
      )
      .setColor("#ff6200")
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ModerateMembers
      )
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    if (!convertedTime)
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    try {
      await member.timeout(convertedTime, reason);

      interaction.reply({ embeds: [succesEmbed], ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};
