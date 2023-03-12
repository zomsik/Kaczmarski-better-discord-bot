import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from "discord-player";
import { SlashCommand } from '../../types';

const queue: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Show songs queue!'),


	async execute(interaction) {


        let queue = useQueue(interaction.member.guild.id);


        await interaction.deferReply();

        if (!queue || !queue.tracks.size) {
            return await interaction.followUp({ content: 'No songs in queue!' });
        }
        else {

        let embedReply = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Queue");
        

        
        let content = "";
        const songsArray = queue.tracks.toArray()
        if (queue.tracks.size >=10) {
            for (let i=0; i<10; i++)
            {
                embedReply.addFields({ name: '\u200B', value: `**${i+1}.** ${songsArray[i].title}`});

            }
        }
        else {
            for (let i=0; i<queue.tracks.size; i++)
            {
                embedReply.addFields({ name: '\u200B', value: `**${i+1}.** ${songsArray[i].title}`});
                //content += `**${i+1}.** ${queue.tracks[i].title}\n`;
            }
        }


        return await interaction.followUp({ embeds: [embedReply] });


        }




	},
};
export default queue;