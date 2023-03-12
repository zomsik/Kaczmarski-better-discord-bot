import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types';

const avatar: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar URL of the selected user, or your own avatar.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
        
        execute: async interaction => {


            const user = interaction.options.getUser('target');

            if (user) 
                return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL()}`);
            
            return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
        },
};
export default avatar;