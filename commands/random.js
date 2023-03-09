const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');
const { QueryType } = require("discord-player");
const playdl = require("play-dl");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('I play a randomly selected song of Kaczmarski!'),

	async execute(interaction) {


		if (!interaction.member.voice.channelId) 
            return await interaction.reply({ content: "Join any voice channel first!", ephemeral: true });

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) 
            return await interaction.reply({ content: "You are not on my voice channel right now!", ephemeral: true });

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
            return await interaction.reply({ content: "I am unable to join your voice channel!", ephemeral: true });
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

        if (!queue.playing && !queue.tracks.length) {
            await queue.addTrack(track);
            queue.playing=true;
            await queue.play();
            return await interaction.followUp({ content: `Gram: **${track.title}**!` });
        }
        else {
            await queue.addTrack(track);
            return await interaction.followUp({ content: `Dodano do kolejki: **${track.title}**!` });
        }


	},
};