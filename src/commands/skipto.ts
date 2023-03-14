import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from "discord-player";
import { SlashCommand } from '../../types';

const skip: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('skipto')
		.setDescription('Skip to selected song!')
        .addStringOption((option: any) =>
            option.setName('songnumber')
            .setDescription('Song next to play')
            .setRequired(true)
        ),

	async execute(interaction) {

        let queue = useQueue(interaction.member.guild.id);

        await interaction.deferReply();

        if (!queue || !queue.node.isPlaying()) {
            return await interaction.followUp({ content: 'No song to skip!' });
        }
        else {


        const skipto = interaction.options.getString("songnumber");

        if (!isNaN(skipto)) {
            if (skipto<=queue.tracks.size) {
                const trackTitle = queue.tracks.toArray()[skipto-1].title;
                    for(let i=0; i<skipto-1; i++)
                    {
                        const skipped = queue.node.remove(0);
                        if (!skipped)
                            return await interaction.followUp({ content: `Error while skipping songs!` });
                    }
                    const skipped = queue.node.skip();
                    if (skipped)
                        return await interaction.followUp({ content: `Skipped songs to: **${trackTitle}**!` });
                    else
                        return await interaction.followUp({ content: `Error while skipping songs!` });
                }
                else {
                    return await interaction.followUp({ content: `Can't skip to song not in queue!` });
                }
            
        } else {
            return await interaction.followUp({ content: `Typed not a number to skip to!` });
        } } },
};
export default skip;