const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription(
      "🧹 Clear a specific amount of messages from the channel or from a specific user."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages that you want to delete.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Select a target to clear their messages.")
        .setRequired(false)
    ),

  async execute(interaction) {
    const { channel, options } = interaction;

    const amount = options.getInteger("amount");
    const target = options.getUser("target");

    const messages = await channel.messages.fetch({
      limit: amount + 1,
    });

    const res = new EmbedBuilder().setColor("#ff6200");

    if (target) {
      let i = 0;
      const filtered = [];

      (await messages).filter((msg) => {
        if (msg.author.id === target.id && amount > i) {
          filtered.push(msg);
          i++;
        }
      });

      await channel.bulkDelete(filtered).then((messages) => {
        res.setDescription(
          `Succesfully deleted **${messages.size}** messages from ${target}.`
        );
        interaction.reply({ embeds: [res], ephemeral: true });
      });
    } else {
      await channel.bulkDelete(amount, true).then((messages) => {
        res
          .setDescription(
            `Succesfully deleted **${messages.size}** messages from the channel.`
          )
          .setFooter({
            text: "Veracity Roleplay",
            iconURL:
              "https://cdn.discordapp.com/attachments/738117166649573499/1083783904080711790/V_orange_png.png",
          });
        interaction.reply({ embeds: [res], ephemeral: true });
      });
    }
  },
};
