const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');
const { QueryType } = require("discord-player");
const playdl = require("play-dl");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('losuj')
		.setDescription('Losuję jedną piosenka Kaczmarskiego!'),

	async execute(interaction) {


		if (!interaction.member.voice.channelId) 
            return await interaction.reply({ content: "Wejdź na kanał, abym grał!", ephemeral: true });

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) 
            return await interaction.reply({ content: "Nie jesteś na moim obecnym kanale!", ephemeral: true });

        const query = interaction.options.getString("query");

        if(!interaction.client.player.queue) {
        var queue = interaction.client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            },
            async onBeforeCreateStream(track, source, _queue) {
                return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
            }
        });
        }
        else {
            var queue = interaction.client.player.getQueue(interaction.member.guild.id);
        }

        try {
            if (!queue.connection) 
                await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Nie mogę dołączyć do Twojego kanału!", ephemeral: true });
        }

        await interaction.deferReply();


        const data = require('../data')

        const losuj = Math.floor(Math.random()*data.Utwory.length);

        const track = await interaction.client.player
            .search(data.Utwory[losuj][1], {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem');
            })
            .then(x => x.tracks[0]);

        if (!track) 
            return void interaction.followUp({ content: `❌ | Nie znaleziono utworu: **${query}** !`  });

        queue.addTrack(track);
        console.log(queue.playing)

        if (!queue.playing) {
            await queue.play();
            return await interaction.followUp({ content: `Gram: **${track.title}**!` });
        }
        else {
            return await interaction.followUp({ content: `Dodano do kolejki: **${track.title}**!` });
        }


	},
};