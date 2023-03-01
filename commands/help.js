const { SlashCommandBuilder } = require('discord.js');

const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Wyświetlam informację o komendach!'),


	async execute(interaction) {
        await interaction.deferReply();

        let embedReply = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Pomoc");


        embedReply.addFields({ name: '\u200B', value: `**/graj <song>- ** Odtwarzam wybrany utwór\n`});
        embedReply.addFields({ name: '\u200B', value: `**/zagraj <song>- ** Odtwarzam wybrany utwór jako następny\n`});
        embedReply.addFields({ name: '\u200B', value: `**/losuj- ** Odtwarzam losowy utwór Kaczmarskiego\n`});
        embedReply.addFields({ name: '\u200B', value: `**/skip- ** Pomijam aktualnie grany utwór\n`});
        embedReply.addFields({ name: '\u200B', value: `**/stop- ** Pomijam wszystkie dodane utwory\n`});
        embedReply.addFields({ name: '\u200B', value: `**/usun <song>- ** Usuwam napisany utwór lub numer z kolejki\n`});
        embedReply.addFields({ name: '\u200B', value: `**/kolejka- ** Wyświetlam aktualną kolejkę`});


        return await interaction.followUp({ embeds: [embedReply] });

	},
};