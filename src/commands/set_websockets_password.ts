import { SlashCommandBuilder } from 'discord.js';
import writeServerVariables from '../functions/writeServerVariables';
import { SlashCommand } from '../../types';

const set_websockets_password: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('set_websockets_password')
		.setDescription('Set WebSockets password for some requests!')
        .addStringOption((option: any) =>
            option.setName('websocketpassword')
            .setDescription('Password (empty for none)')
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ),


	async execute(interaction) {

        const webSocketsPassword = interaction.options.getString("websocketpassword");

        await interaction.deferReply();

        writeServerVariables(interaction.member.guild.id, "webSocketPassword", webSocketsPassword);

        return await interaction.followUp({ content: `Websockets' password set!` });
	},
};
export default set_websockets_password;