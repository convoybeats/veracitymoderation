const { EmbedBuilder } = require("discord.js");
const { GuildMember, Embed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  execute(member) {
    const { user, guild } = member;
    const leaveChannel = member.guild.channels.cache.get("905882227953516575");
    const leaveMessage = `${user} - *${user.id}* a quitte le serveur.`;
    const tag = user.tag;
    const icon = user.displayAvatarURL();

    const leaveEmbed = new EmbedBuilder()
      .setTitle("**Depart**")
      .setDescription(leaveMessage)
      .setAuthor({ name: tag, iconURL: icon })
      .setColor("Red")
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    leaveChannel.send({ embeds: [leaveEmbed] });
  },
};
