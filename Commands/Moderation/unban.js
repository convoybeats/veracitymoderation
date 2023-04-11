const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription(
      "➕ Unban a user that has been previously banned from the server."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("Discord ID of the user you want to unban.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { channel, options } = interaction;

    const userID = options.getString("userid");

    try {
      await interaction.guild.members.unban(userID);

      const embed = new EmbedBuilder()
        .setDescription(`Succesfully unbanned id ${userID} from the server.`)
        .setColor("#ff6200")
        .setTimestamp()
        .setFooter({
          text: "Veracity Roleplay",
          iconURL:
            "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
        });

      await interaction.reply({
        embeds: [embed],
      });
    } catch (err) {
      console.log(err);

      const errEmbed = new EmbedBuilder()
        .setDescription(`Please provide a valid member's ID.`)
        .setColor("#ff6200")
        .setFooter({
          text: "Veracity Roleplay",
          iconURL:
            "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
        });

      interaction.reply({ embeds: [errEmbed], ephemeral: true });
    }
  },
};
