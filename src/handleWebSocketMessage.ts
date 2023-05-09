import { useQueue } from "discord-player";
import { Socket } from "socket.io";
import { WebSocketRequestType } from '../types';
import KaczmarskiClient from "./KaczmarskiClient";


export default async function handleWebSocketMessage(socket: Socket, serverId: string, message: string) {

    switch (message.toLowerCase()) {
        case WebSocketRequestType.GetSong: {
            let queue = useQueue(serverId);

            if (queue && queue.node.isPlaying()) {
                if (queue.currentTrack) {
                    socket.emit('response', queue.currentTrack.title);
                }
                else {
                    socket.emit('response', 'Song without title');
                }
            } else {
                socket.emit('response', 'No music right now');
            }

            break;
        }
        case WebSocketRequestType.GetServerName: {
            const client = KaczmarskiClient.Instance;
            const guild = await client.guilds.fetch(serverId)
            socket.emit('response', guild.name);
            break;
        }
        default: {
            socket.emit('response', 'Wrong request');
            break;
        }
    }

}
