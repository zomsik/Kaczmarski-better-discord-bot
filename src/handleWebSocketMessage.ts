import { GuildQueue, useQueue } from "discord-player";
import { Socket } from "socket.io";
import { WebSocketRequestType } from '../types';
import KaczmarskiClient from "./KaczmarskiClient";
import sendMessage from "./functions/sendMessage";
import changeVolume from "./functions/changeVolume";
import checkIfFileExists from "./functions/checkIfFileExists";
import readServerVariables from "./functions/readServerVariables";
import { webSocketServer } from './index';

export default async function handleWebSocketMessage(socket: Socket, serverId: string, request: any) {

    try {
        if (typeof request === 'string') {
          request = JSON.parse(request);
        }
      } catch (error) {
        socket.emit('response', 'Request is not in JSON type');
        return
      }

    if (request.command === undefined){
        socket.emit('response', 'Request have wrong attributes');
        return;
    }

    switch (request.command.toLowerCase()) {
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
        case WebSocketRequestType.SkipSong: {
            const client = KaczmarskiClient.Instance;
            let queue = useQueue(serverId);

            if (queue && queue.node.isPlaying()) {
              const skipped = queue.node.skip();
              if (skipped) {
                if(request.channel)
                    sendMessage(serverId, request.channel, "Skipped song with WebSocket!", client);
                socket.emit('response', 'Skipped');
              } else {
                socket.emit('response', 'Problem occured');
              }
            } else {
              socket.emit('response', 'No music to skip');
            }

            break;
        }
        case WebSocketRequestType.ChangeVolume: {
            let queue = useQueue(serverId);

            if (queue) {
                const volume: number = Number(request.volume as string);
                const operation = request.operation as string;
                const previousVolume: number = queue.node.volume; 
                const client = KaczmarskiClient.Instance;

                if (isNaN(volume)) {
                    socket.emit('response', 'Volume is not a number');
                    return;
                }
        
                if (volume > 100 || volume < 0) {
                    socket.emit('response', 'Volume level must be a number between 0-100');
                    return;
                } else {
                    if (changeVolume(queue, volume, operation, previousVolume)) {
                        socket.emit('response', `Volume level set to ${queue.node.volume}`);
                        if (request.channel)
                            sendMessage(serverId, request.channel, `Volume changed with WebSocket to ${queue.node.volume}!`, client);
                    } else {
                        socket.emit('response', 'Undefined volume change operation');
                    }
                }
            }
            else {
                socket.emit('response', 'Could not set volume');
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

export async function emitNewSong(queue: GuildQueue<any>) {
    checkIfFileExists('../serversVariables.json')
    const serverId = queue.guild.id;

    const areWebSocketsActivated: boolean | string = readServerVariables(serverId,"areWebSocketActivated");
    if (!areWebSocketsActivated) {
        return;
    }
    
    if (queue.currentTrack) {
        webSocketServer.to(serverId).emit("newsong", queue.currentTrack.title as string);
    } else {
        webSocketServer.to(serverId).emit("newsong", "No music anymore");
    }
}