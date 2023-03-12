import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { Player } from 'discord-player';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { SlashCommand } from '../types';
dotenv.config();

const {Guilds, GuildMessages, GuildVoiceStates, GuildInvites, GuildMessageReactions, MessageContent} = GatewayIntentBits;
const {User, Message, GuildMember, Channel} = Partials;

export default class KaczmarskiClient extends Client {

    private static _instance: KaczmarskiClient;

    public static getInstance()
    {
        return this._instance || (this._instance = new this());
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    commands: Collection<string, SlashCommand>;
    player: Player;
    
    constructor() {
     super({
      intents: [Guilds,GuildMessages,GuildVoiceStates,GuildInvites,GuildMessageReactions,MessageContent],
      partials: [User, Message, GuildMember, Channel],
    });
     this.commands = new Collection();
     this.player = Player.singleton(this);
     this.loadCommands()
     this.loadEvents()
    }

    loadCommands() {
      const commandsPath = path.join(__dirname, './commands');
      
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
      
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath).default;

        this.commands.set(command.data.name, command);
      }

    }
    loadEvents() {
      const eventsPath = path.join(__dirname, 'events');
      const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
      
      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath).default;
        if (event.once) {
          this.once(event.name, (...args) => event.execute(...args));
        } else {
          this.on(event.name, (...args) => event.execute(...args));
          
        }
      }

      
    }

  }