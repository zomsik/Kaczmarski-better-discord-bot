import { Server as HttpServer} from "http"
import { Server, Socket } from "socket.io";


export default function initWebSocket(server: HttpServer) {
    const io = new Server(server, {});

    io.on('connection', (socket: Socket) => {
        const request = socket.handshake;
  
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}