const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun')
		.setDescription('Usuwa wybrany utwór z kolejki!')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('Utwór do usunięcia')
            .setRequired(true)
        ),

	async execute(interaction) {

        let queue = interaction.client.player.getQueue(interaction.member.guild.id);


        const query = interaction.options.getString("song");


        await interaction.deferReply();



        if (!queue || !queue.tracks.length) {
            return await interaction.followUp({ content: 'Brak utworów do usunięcia!' });
        }
        else {


        if (!isNaN(query)) {
            if (query < queue.tracks.length) {
                queue.tracks.splice(query-1,1);
                return await interaction.followUp({ content: `Usunięto utwór!` });
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
            .then(x => x.tracks[0]);            


            for (let i=0; i<queue.tracks.length; i++)
            {
                if (track.title == queue.tracks[i].title)
                {
                    queue.tracks.splice(i,1);
                    return await interaction.followUp({ content: `Usunięto utwór!` });
                }
            }

            return await interaction.followUp({ content: `Nic nie usunięto!` });


        }
    }




	},
};