const { EmbedBuilder } = require("discord.js");
const { GuildMember, Embed } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const { user, guild } = member;
    const welcomeChannel =
      member.guild.channels.cache.get("738099614238113865");
    const welcomeMessage = `${user} a rejoint le serveur`;
    const tag = user.tag;
    const icon = user.displayAvatarURL();

    const welcomeEmbed = new EmbedBuilder()
      .setTitle("**Nouveau membre**")
      .setDescription(welcomeMessage)
      .setAuthor({ name: tag, iconURL: icon })
      .setColor("Green")
      .addFields({ name: "Membres:", value: `${guild.memberCount}` })
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    welcomeChannel.send({ embeds: [welcomeEmbed] });
  },
};
