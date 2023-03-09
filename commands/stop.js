const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Delete queue and stop playing music!'),


	async execute(interaction) {

        let queue = interaction.client.player.getQueue(interaction.member.guild.id);

        await interaction.deferReply();

        if (!queue.playing ||!queue || !queue.tracks.length) {
            return await interaction.followUp({ content: 'No songs to delete!' });
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
                return await interaction.followUp({ content: `Deleted 0 songs!` });
            else if (skippedSongs==1)
                return await interaction.followUp({ content: `Deleted **${skippedSongs}** song!` });
            else
                return await interaction.followUp({ content: `Deleted **${skippedSongs}** songs!` });

        }
        else
            return await interaction.followUp({ content: `Error while stoping!` });

        }




	},
};