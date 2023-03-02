require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { Player } = require("discord-player");

const {Guilds, GuildMessages, GuildVoiceStates, GuildInvites, GuildMessageReactions, MessageContent} = GatewayIntentBits;
const {User, Message, GuildMember, Channel} = Partials;


const client = new Client({
    intents: [Guilds,
      GuildMessages,
      GuildVoiceStates,
      GuildInvites,
      GuildMessageReactions,
      MessageContent],
    partials: [User, Message, GuildMember, Channel],
  });
  
  
  
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      client.commands.set(command.data.name, command);
  }
  
  
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  
  for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
      } else {
          client.on(event.name, (...args) => event.execute(...args));
      }
  }
  
  const player = new Player(client);
  client.player = player;
  
  

client.login(process.env.TOKEN);


module.exports = client;