const { SlashCommandBuilder } = require('discord.js');
const writeServerVariables = require('../functions/writeServerVariables');

module.exports = {
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


	async execute(interaction) {

        const optionSelected = interaction.options.getString("active");

        await interaction.deferReply();

        if (optionSelected === 'true')
        {
            await writeServerVariables(interaction.member.guild.id, "areAPIActivated", true);

            return await interaction.followUp({ content: `APIs' are **ON**!` });
        }
        else
        {
            await writeServerVariables(interaction.member.guild.id, "areAPIActivated", false);

            return await interaction.followUp({ content: `APIs' are **OFF**!` });
        }

        


	},
};