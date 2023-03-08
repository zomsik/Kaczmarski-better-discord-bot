function sendMessage(serverId, channelId, message, client) {

    const server = client.guilds.cache.get(serverId);


    if (server) {
      const channel = server.channels.cache.get(channelId);
      
      if (channel) {
        channel.send(message);
      } else {
        console.log(`No channel with ID: ${channelId}`);
      }
    } else {
      console.log(`No server with ID: ${serverId}`);
    }
  }
  
  module.exports = sendMessage;