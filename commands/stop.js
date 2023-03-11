const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Delete queue and stop playing music!'),


	async execute(interaction) {


        let queue = useQueue(interaction.member.guild.id);

        await interaction.deferReply();

        if (!queue.node.isPlaying() ||!queue || !queue.tracks.size) {
            return await interaction.followUp({ content: 'No songs to delete!' });
        }
        else {

        let skippedSongs = queue.tracks.size;
        queue.tracks.clear();

        if (queue.node.isPlaying())
        {
            skippedSongs+=1;
        }

        const skipped = queue.node.skip();
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