function sendMessage(serverId, channelId, message, client) {

    const server = client.guilds.cache.get(serverId);


    if (server) {
      const channel = server.channels.cache.get(channelId);
      
      if (channel) {
        channel.send(message);
      } else {
        console.log(`Nie znaleziono kanału o ID ${channelId}.`);
      }
    } else {
      console.log(`Nie znaleziono serwera o ID ${serverId}.`);
    }
  }
  
  module.exports = sendMessage;