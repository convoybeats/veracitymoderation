const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  GuildVerificationLevel,
  GuildExplicitContentFilter,
  GuildNSFWLevel,
} = require("discord.js");
const { GuildMember, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("ℹ Gather information about the current discord server.")
    .setDMPermission(false),

  async execute(interaction) {
    const { guild } = interaction;
    const { members, channels, emojis, roles, stickers } = guild;

    const sortedRoles = roles.cache
      .map((role) => role)
      .slice(1, roles.cache.size)
      .sort((a, b) => b.position - a.position);

    const userRoles = sortedRoles.filter((role) => !role.managed);
    const managedRoles = sortedRoles.filter((role) => role.managed);
    const botCount = members.cache.filter((member) => member.user.bot).size;

    const maxDisplayRoles = (roles, maxFieldLenght = 1024) => {
      let totalLenght = 0;
      const result = [];

      for (const role of roles) {
        const roleString = `<@${role.id}>`;

        if (roleString.length + totalLenght > maxFieldLenght) break;

        totalLenght += roleString.length + 1;
        result.push(roleString);
      }

      return result.length;
    };

    const splitPascal = (string, separator) =>
      string.split(/(?=[A-U])/).join(separator);
    const toPascalCase = (string, separator = false) => {
      const pascal =
        string.charAt(0).toLowerCase() +
        string
          .slice(1)
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
      return separator ? splitPascal(pascal, separator) : pascal;
    };

    const getChannelTypeSize = (type) =>
      channels.cache.filter((channel) => type.includes(channel.type)).size;

    const totalChannels = getChannelTypeSize([
      ChannelType.GuildText,
      ChannelType.GuildVoice,
      ChannelType.GuildStageVoice,
      ChannelType.GuildForum,
      ChannelType.GuildCategory,
    ]);

    const embed = new EmbedBuilder()
      .setColor("#FF6200")
      .setTitle(`${guild.name}'s information.`)
      .setThumbnail(guild.iconURL({ size: 1024 }))
      .setImage(guild.bannerURL({ size: 1024 }))
      .addFields(
        { name: "Description", value: `${guild.description || "None"}` },
        {
          name: "General",
          value: [
            `⏰ **Created At:** <t:${parseInt(
              guild.createdTimestamp / 1000
            )}:R>`,
            `💳 **ID:** ${guild.id}`,
            `👑 **Owner:** <@${guild.ownerId}>`,
            `🌍**Language:** ${new Intl.DisplayNames(["fr"], {
              type: "language",
            }).of(guild.preferredLocale)}`,
            `💻 **Vanity URL:** ${guild.vanityURLCode || "None"}`,
          ].join(" \n"),
        },
        {
          name: "Features",
          value:
            guild.features
              ?.map((feature) => `-${toPascalCase(feature, " ")}`)
              ?.join(" \n") || "None",
          inline: true,
        },
        {
          name: "Security",
          value: [
            `👀 **Explicit Filter:** ${splitPascal(
              GuildExplicitContentFilter[guild.explicitContentFilter],
              ""
            )}`,
            `🔞 **NSFW Level:** ${splitPascal(
              GuildNSFWLevel[guild.nsfwLevel],
              ""
            )}`,
            `🔒 **Verification Level:** ${splitPascal(
              GuildVerificationLevel[guild.verificationLevel],
              ""
            )}`,
          ].join(" \n"),
          inline: true,
        },
        {
          name: `Members (${guild.memberCount})`,
          value: [
            `**👩‍👩‍👦‍👦 User:** ${guild.memberCount - botCount}`,
            `**🤖 Bots:** ${botCount}`,
          ].join(" \n"),
          inline: true,
        },
        {
          name: `Channels, Threads and Categories (${totalChannels})`,
          value: [
            `**💬 Text Channels:** ${getChannelTypeSize([
              ChannelType.GuildText,
              ChannelType.GuildForum,
              ChannelType.GuildNews,
            ])}`,
            `🎤 **Voice Channels:** ${getChannelTypeSize([
              ChannelType.GuildVoice,
              ChannelType.GuildStageVoice,
            ])}`,
            `📁 **Categories:** ${getChannelTypeSize([
              ChannelType.GuildCategory,
            ])}`,
          ].join(" \n"),
          inline: true,
        },
        {
          name: `Emojis & Stickers (${
            emojis.cache.size + stickers.cache.size
          })`,
          value: [
            `🎭 **Animated:** ${
              emojis.cache.filter((emoji) => emoji.animated).size
            }`,
            `✨ **Static:** ${
              emojis.cache.filter((emoji) => !emoji.animated).size
            }`,
            `🎆 **Stickers:** ${stickers.cache.size}`,
          ].join(" \n"),
          inline: true,
        },
        {
          name: `Nitro`,
          value: [
            `📈 **Level:** ${guild.premiumTier}`,
            `💪 **Boosts:** ${guild.premiumSubscriptionCount}`,
            `💎 **Boosters:** ${
              guild.members.cache.filter(
                (member) => member.roles.premiumSubscriptionRole
              ).size
            }`,
            `📌 **Total Boosters:** ${
              guild.members.cache.filter((member) => member.roles.premiumSince)
                .size
            }`,
          ].join("\n"),
          inline: true,
        },
        { name: "Banner", value: guild.bannerURL() ? "** **" : "None" }
      )
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });
    interaction.reply({ embeds: [embed] });
  },
};
