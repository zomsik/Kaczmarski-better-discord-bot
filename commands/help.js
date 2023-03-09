const { SlashCommandBuilder } = require('discord.js');

const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show informations about commands!'),


	async execute(interaction) {
        await interaction.deferReply();

        let embedReply = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Help");


        embedReply.addFields({ name: '\u200B', value: `**/play <song>- ** Odtwarzam wybrany utwór\n`});
        embedReply.addFields({ name: '\u200B', value: `**/fplay <song>- ** Odtwarzam wybrany utwór jako następny\n`});
        embedReply.addFields({ name: '\u200B', value: `**/random- ** Odtwarzam losowy utwór Kaczmarskiego\n`});
        embedReply.addFields({ name: '\u200B', value: `**/skip- ** Pomijam aktualnie grany utwór\n`});
        embedReply.addFields({ name: '\u200B', value: `**/stop- ** Pomijam wszystkie dodane utwory\n`});
        embedReply.addFields({ name: '\u200B', value: `**/delete <song>- ** Usuwam napisany utwór lub numer z kolejki\n`});
        embedReply.addFields({ name: '\u200B', value: `**/queue- ** Wyświetlam aktualną kolejkę`});


        return await interaction.followUp({ embeds: [embedReply] });

	},
};