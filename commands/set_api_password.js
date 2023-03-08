const { SlashCommandBuilder } = require('discord.js');
const writeServerVariables = require('../functions/writeServerVariables');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_api_password')
		.setDescription('Set api password for some requests!')
        .addStringOption(option =>
            option.setName('apipassword')
            .setDescription('Password (empty for none)')
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ),


	async execute(interaction) {

        const apiPassword = interaction.options.getString("apipassword");

        await interaction.deferReply();


        await writeServerVariables(interaction.member.guild.id, "apiPassword", apiPassword);

        return await interaction.followUp({ content: `APIs' password set!` });
	},
};