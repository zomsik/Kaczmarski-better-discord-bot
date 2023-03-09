const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');
const { QueryType } = require("discord-player");
const playdl = require("play-dl");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play requested song!')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('Song requested')
            .setRequired(true)
        ),


	async execute(interaction) {


        

		if (!interaction.member.voice.channelId) 
            return await interaction.reply({ content: "Join any voice channel first!", ephemeral: true });

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) 
            return await interaction.reply({ content: "You are not on my voice channel right now!", ephemeral: true });

        const query = interaction.options.getString("song");


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
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "I am unable to join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();


        const track = await interaction.client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem while searching song');
            })
            //.then(x => x.tracks.sort(function(a, b) { 
            //    return b.views - a.views;
            //}))
            .then(x => x.tracks[0]);

        if (!track) 
            return void interaction.followUp({ content: `Song **${query}** not found!`  });

        if (!queue.playing && !queue.tracks.length) {
            await queue.addTrack(track);
            queue.playing=true;
            await queue.play();
            return await interaction.followUp({ content: `I play **${track.title}**!` });
        }
        else {
            await queue.addTrack(track);
            return await interaction.followUp({ content: `Added to queue **${track.title}**!` });
        }




	},
};