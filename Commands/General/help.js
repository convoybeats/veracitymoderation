const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the list of commands and information about the bot"),

  async execute(interaction) {
    const helpmenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("menu")
        .setPlaceholder("Select a topic")
        .addOptions(
          {
            label: "General",
            description: "Shows all general commands",
            value: "menu1",
          },

          {
            label: "Moderation commands",
            description: "Shows all moderation commands",
            value: "menu2",
          },

          {
            label: "Informtation commands",
            description: "Shows the information commands",
            value: "menu3",
          }
        )
    );

    const funbutton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("funbutton")
        .setLabel("Fun commands")
        .setStyle(ButtonStyle.Secondary)
    );

    const generalcommands = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("back")
        .setLabel("Back")
        .setStyle(ButtonStyle.Primary)
    );

    const inviteme = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite me")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/veracityrp")
    );

    const embed = new EmbedBuilder()
      .setColor("#ff6200")
      .setDescription(
        "Select a topic with the dropdown menu below this embed message in order to show all commands available for the Veracity Moderation bot."
      )
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    const publicem = new EmbedBuilder()
      .setColor("Green")
      .setDescription(
        "`/help`: Shows help menu\n`/embed-builder`: Let's you make a custom embed message\n`/ping`: Pong!"
      )
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    const funem = new EmbedBuilder()
      .setColor("Yellow")
      .setDescription("Comming soon")
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    const modem = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        "`/ban`: Bans a user\n`/unban`: Unbans a user\n`/kick`: Kicks a user\n`/mute`: Mutes a user\n`/unmute`: Unmutes a user\n`/clear`: Clear messages from the channel or a specific user"
      )
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    const musicem = new EmbedBuilder()
      .setColor("Purple")
      .setDescription(
        "`/botinfo`: Shows information about the bot\n`/serverinfo`: Shows information about the discord server\n`/userinfo`: Gathers information about a specific user\n`/uptime`: Shows the uptime of the bot\n"
      )
      .setTimestamp()
      .setFooter({
        text: "Veracity Roleplay",
        iconURL:
          "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
      });

    const message = await interaction.reply({
      embeds: [embed],
      components: [helpmenu, inviteme],
    });

    const collector = await message.createMessageComponentCollector();

    collector.on(`collect`, async (i) => {
      if (i.customId === "menu") {
        const value = i.values[0];
        if (i.user.id !== interaction.user.id) {
          return await i.reply({
            content: `Only ${interaction.user.tag} can interact with the select menu!`,
            ephemeral: true,
          });
        }
        if (value === "menu1") {
          await i.update({
            embeds: [publicem],
            components: [helpmenu, funbutton, inviteme],
          });
        }

        if (value === "menu2") {
          await i.update({ embeds: [modem], components: [helpmenu, inviteme] });
        }

        if (value === "menu3") {
          await i.update({
            embeds: [musicem],
            components: [helpmenu, inviteme],
          });
        }
      }

      if (i.customId === "funbutton") {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({
            content: `Only ${interaction.user.tag} can interact with the buttons!`,
            ephemeral: true,
          });
        }
        await i.update({
          embeds: [funem],
          components: [helpmenu, generalcommands, inviteme],
        });
      }

      if (i.customId === "back") {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({
            content: `Only ${interaction.user.tag} can interact with the buttons!`,
            ephemeral: true,
          });
        }
        await i.update({
          embeds: [publicem],
          components: [helpmenu, funbutton, inviteme],
        });
      }
    });
  },
};
