import writeServerVariables from '../functions/writeServerVariables';
import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types';

const activate_api: SlashCommand = {
    data: new SlashCommandBuilder()
		.setName('activate_api')
		.setDescription('Active or deactive Api and all HTTP requests!')
        .addStringOption(option =>
            option.setName('active')
            .setDescription('State of API')
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
                writeServerVariables(interaction.member.guild.id, "areAPIActivated", true);
                return await interaction.followUp({ content: `APIs' are **ON**!` });
            } else {
                writeServerVariables(interaction.member.guild.id, "areAPIActivated", false);
                return await interaction.followUp({ content: `APIs' are **OFF**!` });
            }

	},
};
export default activate_api;