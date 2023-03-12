import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from "discord-player";
import { SlashCommand } from '../../types';

const volume: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set volume level')
        .addStringOption((option: any) =>
            option.setName('volumelevel')
            .setDescription('Volume (0-100)')
            .setRequired(true)
        ),


	async execute(interaction) {

        const volumeSelected = interaction.options.getString("volumelevel");

        await interaction.deferReply();

        if (isNaN(volumeSelected)) {
            return await interaction.followUp({ content: `Volume level must be a number!` });
        }


        if (volumeSelected > 100 || volumeSelected < 0)
        {
            return await interaction.followUp({ content: `Volume level must be a number between 0-100` });
        }
        else
        {


            if (!interaction.member.voice.channelId) 
                return await interaction.reply({ content: "Join any voice channel first!", ephemeral: true });

            if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) 
                return await interaction.reply({ content: "You are not on my voice channel right now!", ephemeral: true });





            let queue = useQueue(interaction.member.guild.id);

            if (!queue)
            {
                return await interaction.followUp({ content: `I have to start playing before changing volume!` });
            }

            queue.node.setVolume(parseInt(volumeSelected,10));

            return await interaction.followUp({ content: `Set volume level to **${volumeSelected}**!` });
        }

        


	},
};

export default volume;