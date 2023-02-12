const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');
const { QueryType } = require("discord-player");
const playdl = require("play-dl");

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


        

		if (!interaction.member.voice.channelId) 
            return await interaction.reply({ content: "Wejdź na kanał, abym grał!", ephemeral: true });

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) 
            return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        const query = interaction.options.getString("query");


        const queue = interaction.client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            },
            async onBeforeCreateStream(track, source, _queue) {
                return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
            }


        });
        

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Nie mogę dołączyć do Twojego kanału!", ephemeral: true });
        }

        await interaction.deferReply();


        const track = await interaction.client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem');
            })
            .then(x => x.tracks.sort(function(a, b) { 
                return b.views - a.views;
            }))
            .then(x => x[0]);

        if (!track) 
            return void interaction.followUp({ content: `❌ | Nie znaleziono utworu: **${query}** !`  });


        await queue.play(track, { immediate: true });
        //if (!queue.playing) 
        //    await queue.play();

        return await interaction.followUp({ content: `⏱️ | Gram: **${track.title}**!` });







	},
};