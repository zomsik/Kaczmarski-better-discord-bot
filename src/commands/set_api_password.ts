import { SlashCommandBuilder } from 'discord.js';
import writeServerVariables from '../functions/writeServerVariables';
import { SlashCommand } from '../../types';

const set_api_password: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('set_api_password')
		.setDescription('Set api password for some requests!')
        .addStringOption((option: any) =>
            option.setName('apipassword')
            .setDescription('Password (empty for none)')
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ),


	async execute(interaction) {

        const apiPassword = interaction.options.getString("apipassword");

        await interaction.deferReply();

        writeServerVariables(interaction.member.guild.id, "apiPassword", apiPassword);

        return await interaction.followUp({ content: `APIs' password set!` });
	},
};
export default set_api_password;