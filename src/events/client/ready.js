const { Client, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const config = process.env;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is ready!`);

    client.user.setActivity({
      name: "Veracity RP",
      type: ActivityType.Watching,
    });
  },
};
