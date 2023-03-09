const { SlashCommandBuilder } = require('discord.js');

const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Show songs queue!'),


	async execute(interaction) {

        let queue = interaction.client.player.getQueue(interaction.member.guild.id);

        await interaction.deferReply();

        if (!queue || !queue.tracks.length) {
            return await interaction.followUp({ content: 'No songs in queue!' });
        }
        else {

        let embedReply = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Queue");
        

        let content = "";

        if (queue.tracks.length >=10) {
            for (let i=0; i<10; i++)
            {
                embedReply.addFields({ name: '\u200B', value: `**${i+1}.** ${queue.tracks[i].title}`});
                content += `**${i+1}.** ${queue.tracks[i].title}\n`;
            }
        }
        else {
            for (let i=0; i<queue.tracks.length; i++)
            {
                embedReply.addFields({ name: '\u200B', value: `**${i+1}.** ${queue.tracks[i].title}`});
                content += `**${i+1}.** ${queue.tracks[i].title}\n`;
            }
        }


        return await interaction.followUp({ embeds: [embedReply] });


        }




	},
};