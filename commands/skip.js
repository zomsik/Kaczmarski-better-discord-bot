const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip currenct song!'),


	async execute(interaction) {

        let queue = interaction.client.player.getQueue(interaction.member.guild.id);

        
        await interaction.deferReply();

        if (!queue || !queue.playing) {
            return await interaction.followUp({ content: 'No song to skip!' });
        }
        else {

        const track = queue.current;

        if (queue.tracks.length == 0)
            queue.playing=false;

        const skipped = queue.skip();

        if (skipped)
            return await interaction.followUp({ content: `Skipped song: **${track}**!` });
        else
            return await interaction.followUp({ content: `Error while skipping song!` });

        }




	},
};