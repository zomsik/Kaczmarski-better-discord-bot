import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export default function deployCommands(client: any) {
    dotenv.config();


    const commands: Array<Object> = [];
    const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
      const command = require(`${path.join(__dirname, './commands')}/${file}`).default;
      commands.push(command.data);
    }
    const rest: REST = new REST({ version: '10' }).setToken(process.env.TOKEN!);

    (async () => {
      try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
        const data = await rest.put(
          Routes.applicationCommands(process.env.CLIENT_ID!),
          { body: commands }
        );
    
        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
      } catch (error) {
        console.error(error);
      }
    })();

}



