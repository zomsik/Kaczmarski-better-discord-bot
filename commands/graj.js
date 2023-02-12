const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');

const { Player, QueryType } = require("discord-player");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('graj')
		.setDescription('Gram utwór, który zechcesz!')
        .addStringOption(option =>
            option.setName('query')
            .setDescription('Song requested')
            .setRequired(true)
        ),


	async execute(interaction) {

		const player = new Player(interaction.client);
		player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Teraz gram: **${track.title}**!`))

		if (!interaction.member.voice.channelId) return await interaction.reply({ content: "Wejdź na kanał, abym grał!", ephemeral: true });
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.getString("query");


        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        

        console.log(query);

        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Nie mogę dołączyć do Twojego kanału!", ephemeral: true });
        }

        await interaction.deferReply();


        const track = await player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem');
            });
        if (!track || !track.tracks.length) return void interaction.followUp({ content: `❌ | Nie znaleziono utworu: **${query}** !`  });



        if (!queue.playing) await queue.play();

        return await interaction.followUp({ content: `⏱️ | Gram: **${track.title}**!` });







	},
};