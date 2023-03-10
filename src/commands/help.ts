import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../../types';

const help: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show informations about commands!'),


	execute: async interaction => {
        await interaction.deferReply();

        let embedReply = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Help");


        embedReply.addFields({ name: '\u200B', value: `**/play <song>- ** Play selected song\n`});
        embedReply.addFields({ name: '\u200B', value: `**/fplay <song>- ** Play selected song next\n`});
        embedReply.addFields({ name: '\u200B', value: `**/random- ** Play random Kaczmarski song\n`});
        embedReply.addFields({ name: '\u200B', value: `**/skip- ** Skip current song\n`});
        embedReply.addFields({ name: '\u200B', value: `**/stop- ** Skip all songs\n`});
        embedReply.addFields({ name: '\u200B', value: `**/remove <song>- ** Remove chosen song\n`});
        embedReply.addFields({ name: '\u200B', value: `**/queue- ** Show queue`});


        return await interaction.followUp({ embeds: [embedReply] });

	},
};
export default help;