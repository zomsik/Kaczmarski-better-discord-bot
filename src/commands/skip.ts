import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from "discord-player";
import { SlashCommand } from '../../types';

const skip: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip currenct song!'),


	async execute(interaction) {

        let queue = useQueue(interaction.member.guild.id);

        
        await interaction.deferReply();

        if (!queue || !queue.node.isPlaying()) {
            return await interaction.followUp({ content: 'No song to skip!' });
        }
        else {

        const track = queue.currentTrack;

        const skipped = queue.node.skip();

        if (skipped)
            return await interaction.followUp({ content: `Skipped song: **${track}**!` });
        else
            return await interaction.followUp({ content: `Error while skipping song!` });

        }




	},
};
export default skip;