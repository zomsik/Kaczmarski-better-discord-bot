import { TextChannel } from 'discord.js';
import KaczmarskiClient from '../KaczmarskiClient';

function sendMessage(serverId: string, channelId: string, message: string, client: KaczmarskiClient): void {

  const server = client.guilds.cache.get(serverId);

  if (server) {
    const channel= server.channels.cache.get(channelId) as TextChannel;

    if (channel) {
      channel.send(message);
    } else {
      console.log(`No channel with ID: ${channelId}`);
    }
  } else {
    console.log(`No server with ID: ${serverId}`);
  }
}

export default sendMessage;