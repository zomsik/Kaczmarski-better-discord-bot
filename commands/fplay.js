const { SlashCommandBuilder } = require('discord.js');
const { CommandOptionType } = require('slash-create');
const { QueryType, Player } = require("discord-player");
const playdl = require("play-dl");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fplay')
		.setDescription('Add and play this song next!')
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
        
        const player = Player.singleton();
        var queue = player.nodes.get(interaction.guild.id);

        if(!queue) {
            var queue = player.nodes.create(interaction.guild.id,
            {
              metadata: {
               channel: interaction.member.voice.channel,
               client: interaction.guild.members.me,
               requestedBy: interaction.user,
              },
              selfDeaf: true,
              volume: 80,
              leaveOnEmpty: true,
              leaveOnEmptyCooldown: 300000,
              leaveOnEnd: true,
              leaveOnEndCooldown: 300000,
            });
        }


        try {
            if (!queue.connection) 
                await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.delete();
            return await interaction.reply({ content: "I am unable to join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();


        const track = await player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem');
            })
            //.then(x => x.tracks.sort(function(a, b) { 
            //    return b.views - a.views;
            //}))
            .then(x => x.tracks[0]);

        if (!track) 
            return void interaction.followUp({ content: `Song **${query}** not found!`  });


        if (!queue.node.isPlaying() && !queue.tracks.size) {
            queue.addTrack(track);
            await queue.node.play();
            return await interaction.followUp({ content: `I play: **${track.title}**!` });
        }
        else {
            queue.insertTrack(track, 0);
            return await interaction.followUp({ content: `Added to queue as next song: **${track.title}**!` });
        }


	},
};