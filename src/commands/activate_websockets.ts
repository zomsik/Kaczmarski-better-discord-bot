import writeServerVariables from '../functions/writeServerVariables';
import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types';

const activate_websockets: SlashCommand = {
    data: new SlashCommandBuilder()
		.setName('activate_websockets')
		.setDescription('Active or deactive WebSockets!')
        .addStringOption(option =>
            option.setName('active')
            .setDescription('State of WebSockets')
            .setRequired(true)
            .addChoices(
				{ name: 'On', value: 'true' },
				{ name: 'Off', value: 'false' }
			)
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ),
        execute: async (interaction) => {

            const optionSelected = interaction.options.getString("active");

            await interaction.deferReply();
        
            if (optionSelected === 'true')
            {
                writeServerVariables(interaction.member.guild.id, "areWebSocketActivated", true);
                return await interaction.followUp({ content: `WebSockets' are **ON**!` });
            } else {
                writeServerVariables(interaction.member.guild.id, "areWebSocketActivated", false);
                return await interaction.followUp({ content: `WebSockets' are **OFF**!` });
            }

	},
};
export default activate_websockets;