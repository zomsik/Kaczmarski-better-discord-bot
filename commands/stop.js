const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Usuń wszystkie dodane utwory z kolejki!'),


	async execute(interaction) {

        let queue = interaction.client.player.getQueue(interaction.member.guild.id);

        await interaction.deferReply();

        if (!queue || !queue.tracks.length) {
            return await interaction.followUp({ content: 'Brak utworów do usunięcia!' });
        }
        else {

        let skippedSongs = queue.tracks.length;
        queue.tracks=[];

        if (queue.playing)
        {
            skippedSongs+=1;
        }
        queue.playing=false;

        const skipped = queue.skip();
        if (skipped) {
            if (skippedSongs==0)
                return await interaction.followUp({ content: `Nic nie usunięto!` });
            else if (skippedSongs==1)
                return await interaction.followUp({ content: `Usunięto **${skippedSongs}** utwór!` });
            else if (skippedSongs<=4)
                return await interaction.followUp({ content: `Usunięto **${skippedSongs}** utwory!` });
            else
                return await interaction.followUp({ content: `Usunięto **${skippedSongs}** utworów!` });
        }
        else
            return await interaction.followUp({ content: `Błąd przy usuwaniu!` });

        }




	},
};