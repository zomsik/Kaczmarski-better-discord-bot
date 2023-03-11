const { SlashCommandBuilder } = require('discord.js');
const { QueryType, Player } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete a song from queue!')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('Song to delete')
            .setRequired(true)
        ),

	async execute(interaction) {

        const query = interaction.options.getString("song");

        await interaction.deferReply();


        const player = Player.singleton();
        let queue = player.nodes.get(interaction.member.guild.id);


        if (!queue || !queue.tracks.size) {
            return await interaction.followUp({ content: 'No song to delete!' });
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

            const track = await player
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
            .then(x => x.tracks[0]);            


            for (let i=0; i<queue.tracks.size; i++)
            {
                if (track.title == songsArray[i].title)
                {
                    queue.node.remove(i);
                    return await interaction.followUp({ content: `Song **${track.title}** deleted!` });
                }
            }

            return await interaction.followUp({ content: `Nothing deleted!` });


        }
    }




	},
};