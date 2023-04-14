const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription(`Vous indique le lien d'invitation permanent du serveur.`)
    .setDefaultMemberPermissions(PermissionFlagsBits.CreateInstantInvite),

  async execute(interaction) {
    const { options } = interaction;
    const user = options.getUser("user") || interaction.user;
    const icon = user.displayAvatarURL();
    const tag = user.tag;

    const embed = new EmbedBuilder()
      .setAuthor({ name: tag, iconURL: icon })
      .setTitle(`Lien d'invitation permanent`)
      .setDescription("https://discord.gg/veracityrp")
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    interaction.reply({ embeds: [embed] });
  },
};
