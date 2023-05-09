import { useQueue } from "discord-player";
import { Server, Socket } from "socket.io";
import { WebSocketRequestType } from '../types';


export default function handleWebSocketMessage(io: Server, socket: Socket, serverId: string, message: string) {

    switch (message.toLowerCase()) {
        case WebSocketRequestType.GetSong: {
            let queue = useQueue(serverId);

            if (queue && queue.node.isPlaying()) {
                if (queue.currentTrack) {
                    io.emit('response', queue.currentTrack.title);
                }
                else {
                    io.emit('response', 'Song without title');
                }
            } else {
                io.emit('response', 'No music right now');
            }

            break;
        }
        default: {
            io.emit('response', 'Wrong request');
            break;
        }
    }

}
