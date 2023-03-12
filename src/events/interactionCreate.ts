import { Interaction } from 'discord.js';
import { Event } from '../../types';

const interactionCreate: Event = {
    name: 'interactionCreate',
    once : false,
    execute(interaction: Interaction) {

    if (!interaction.isCommand()) 
        return;

    let command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
        command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};

export default interactionCreate;