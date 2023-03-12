import { SlashCommandBuilder } from 'discord.js';
import { QueryType } from "discord-player";
import data from "../data";


import { SlashCommand } from '../../types';

const random: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('I play a randomly selected song of Kaczmarski!'),

	async execute(interaction) {


		if (!interaction.member.voice.channelId) 
            return await interaction.reply({ content: "Join any voice channel first!", ephemeral: true });

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) 
            return await interaction.reply({ content: "You are not on my voice channel right now!", ephemeral: true });


        await interaction.deferReply();

        const query = interaction.options.getString("query");
        var queue = interaction.client.player.nodes.get(interaction.guild.id);

        if(!queue) {
            var queue = interaction.client.player.nodes.create(interaction.guild.id,
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

        const randomize = Math.floor(Math.random()*data.length);

        const track = await interaction.client.player
            .search(data[randomize][1], {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('problem');
            })
            .then((x: any) => x.tracks[0]);

        if (!track) 
            return void interaction.followUp({ content: `Song **${query}** not found!`  });

        if (!queue.node.isPlaying() && !queue.tracks.size) {
            queue.addTrack(track);
            await queue.node.play()
            return await interaction.followUp({ content: `I play: **${track.title}**!` });
        }
        else {
            queue.addTrack(track);
            return await interaction.followUp({ content: `Added to queue: **${track.title}**!` });
        }


	},
};
export default random;