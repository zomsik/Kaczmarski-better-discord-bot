const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');
const { QueryType } = require("discord-player");
const playdl = require("play-dl");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Pomiń aktualny utwór!'),


	async execute(interaction) {

        let queue = interaction.client.player.getQueue(interaction.member.guild.id);

        
        await interaction.deferReply();

        if (!queue || !queue.playing) {
            return await interaction.followUp({ content: 'Brak utworu do pominięcia!' });
        }
        else {

        const track = queue.current;
        const skipped = queue.skip();

        if (skipped)
            return await interaction.followUp({ content: `Pominięto utwór: **${track}**!` });
        else
            return await interaction.followUp({ content: `Błąd przy pomijaniu utworu!` });

        }




	},
};