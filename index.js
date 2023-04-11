const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require("discord.js");
require("dotenv").config();

const { token } = process.env;
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require("./src/functions/handlers/handleEvents");
const { loadCommands } = require("./src/functions/handlers/handleCommands");

const client = new Client({
  intents: [Guilds, GuildMessages, GuildMembers, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.commands = new Collection();

client.login(token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
