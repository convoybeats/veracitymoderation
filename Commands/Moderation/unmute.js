const {
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("➕ Unmute a member from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Select the user you wish to unmute")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options } = interaction;

    const user = options.getUser("target");
    const member = guild.members.cache.get(user.id);

    const errEmbed = new EmbedBuilder()
      .setDescription("Something went wrong, please try again.")
      .setColor("#ff6200")
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    const succesEmbed = new EmbedBuilder()
      .setTitle("**✔ Unmuted**")
      .setDescription(`Succesfully unmuted ${user}`)
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

    try {
      await member.timeout(null);

      interaction.reply({ embeds: [succesEmbed], ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};
