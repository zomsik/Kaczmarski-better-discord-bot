import { SlashCommandBuilder } from 'discord.js';
import { QueryType } from "discord-player";
import { SlashCommand } from '../../types';

const remove: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('removed')
		.setDescription('Remove a song from queue!')
        .addStringOption((option: any) =>
            option.setName('song')
            .setDescription('Song to remove')
            .setRequired(true)
        ),

    execute: async (interaction) => {

        const query = interaction.options.getString("song");

        await interaction.deferReply();


        var queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.tracks.size) {
            return await interaction.followUp({ content: 'No song to remove!' });
        }
        else {

        const songsArray = queue.tracks.toArray();

        if (!isNaN(query)) {
            if (query < queue.tracks.size) {
                const songTitle = songsArray[query-1].title;
                queue.node.remove(query-1);
                return await interaction.followUp({ content: `Song **${songTitle}** deleted!` });
            }

        } else {

            const track = await interaction.client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem');
            })
            //.then(x => x.tracks.sort(function(a, b) { 
            //    return b.views - a.views;
            //}))
            .then((x: any) => x.tracks[0]);            


            for (let i=0; i<queue.tracks.size; i++)
            {
                if (track.title == songsArray[i].title)
                {
                    queue.node.remove(i);
                    return await interaction.followUp({ content: `Song **${track.title}** removed!` });
                }
            }

            return await interaction.followUp({ content: `Nothing removed!` });


        }
    }




	},
};

export default remove;