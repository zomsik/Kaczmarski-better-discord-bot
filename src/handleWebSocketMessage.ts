import { Server as HttpServer} from "http"
import { Server, Socket } from "socket.io";

export default function handleWebSocketMessage(io: Server, socket: Socket, serverId: string, message: string) {

    console.log("Received: "+message)
    io.emit('response', "return");
    io.to(serverId).emit('response', "emitted")

}
